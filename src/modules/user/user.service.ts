import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { User } from './entities/user.entity';
import { createUserDto } from './dto/create-user.dto';
import { comparePassword, hashPassword } from 'src/common/utils/password';
import { loginUserDto } from './dto/login-user.dto';
import { UserPasswordDto } from './dto/user-password.dto';
import { generateToken } from 'src/common/utils/generateToken';
import { removeImage } from 'src/common/utils/removeImage';
import { UserPoint } from '../user_point/user_point.entity';
import { Quiz } from '../quiz/quiz.entity';
import { Comment } from '../comment/comment.entity';
import { Article } from '../article/article.entity';
import { SocailMedia } from '../social-media/social-media.entity';
import { Skill } from '../skill/skill.entity';
import { Question } from '../question/question.entity';
import { Op } from 'sequelize';
import { VerifyCode } from './entities/UserVerifyCode';
import {
  ResetPasswordDto,
  UserRequestVerifyCodeDto,
  UserSendVerifyCodeDto,
} from './dto/verify-code.dto';
import { generateCode } from 'src/common/utils/generateVerifyCode';
import { sendEmail } from 'src/common/utils/sendEmail';

@Injectable()
export class UserService {
  constructor(
    @Inject(repositories.user_repository) private userRepo: typeof User,
    @Inject(repositories.verify_code_repository)
    private verifuCodeRepo: typeof VerifyCode,
  ) {}

  async signUp(body: createUserDto, imageUrl?: string) {
    const userByEmail = await this.findByEmail(body.email);
    if (userByEmail) {
      throw new BadRequestException('الايميل مستخدم من قبل');
    }
    const passwordHased = await hashPassword(body.password);
    const user = await this.userRepo.create({
      ...body,
      password: passwordHased,
    });
    if (imageUrl) {
      user.image = imageUrl;
    }
    await user.save();
    const payload = { userId: user.id };
    const access_token = generateToken(payload);
    return { user: { id: user.id, email: user.email }, token: access_token };
  }

  async login(body: loginUserDto) {
    const userByEmail = await this.findByEmail(body.email);
    if (!userByEmail) {
      throw new NotFoundException('الايميل غير صحيح');
    }
    const isMatch = await comparePassword(body.password, userByEmail.password);
    if (!isMatch) {
      throw new BadRequestException('كلمة المرور خاطئة');
    }
    const payload = { userId: userByEmail.id };
    const access_token = generateToken(payload);
    return {
      user: { id: userByEmail.id, email: userByEmail.email },
      token: access_token,
    };
  }

  async changeEmail(newEmail: string, userId: number) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('المستخدم غير متوفر');
    }
    const userByEmail = await this.findByEmail(newEmail);
    if (userByEmail) {
      throw new BadRequestException('الايميل مستهدم من قبل');
    }
    user.email = newEmail;
    await user.save();
    return user;
  }

  async changePassword(body: UserPasswordDto, userId: number) {
    const { oldPassword, newPassword } = body;
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('المتسخدم غير متوفر');
    }
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('كلمة المرور خاطئة');
    }
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();
    return user;
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.userRepo.findByPk(id);
  }

  async increasePoint(userId: number, points: number) {
    await this.userRepo.increment('points', {
      by: points,
      where: { id: userId },
    });
  }

  async update(attrs: Partial<User>, id: number, newImage?: string) {
    const user = await this.userRepo.findByPk(id);
    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }
    if (newImage && user.image) {
      if (user.image !== '/images/user.png') await removeImage(user.image);
      attrs.image = newImage;
    }
    Object.assign(user, attrs);
    await user.save();
    return user;
  }

  countUsers() {
    return this.userRepo.count();
  }

  async getAllUsers(page: number, limit: number, search: string) {
    const offset = (page - 1) * limit;
    const whereClause = search
      ? {
          name: {
            [Op.like]: `%${search}%`, // استخدام Op.iLike للبحث غير حساس لحالة الأحرف
          },
        }
      : {};
    const { rows, count } = await this.userRepo.findAndCountAll({
      limit,
      offset,
      where: whereClause,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'name', 'email', 'image', 'points', 'createdAt'],
    });
    return { users: rows, totalPages: Math.ceil(count / limit) };
  }

  async getUserProfileForAdmin(userId: number) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      include: [
        { model: Comment },
        { model: UserPoint },
        { model: Quiz },
        { model: Skill },
        { model: SocailMedia },
      ],
    });
    if (!user) {
      throw new Error('هذا المستخدم غير موجود');
    }
    return user;
  }

  getTopUsers(limit: number) {
    return this.userRepo.findAll({ order: [['points', 'DESC']], limit });
  }

  async getUserStats(userId: number) {
    const user = await this.userRepo.findByPk(userId, {
      attributes: ['points'],
      include: [
        {
          model: Comment,
          attributes: ['id'],
        },
        {
          model: Article,
          attributes: ['id'],
        },
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      points: user.points,
      commentsCount: user.comments.length,
      articleViewsCount: user.viewedArticles?.length || 0,
    };
  }

  async getUserPublicProfile(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      include: [
        { model: Comment },
        {
          model: Article,
          as: 'viewedArticles',
        },
        {
          model: Question,
          as: 'viewedQuestions',
        },
        { model: Skill },
        { model: SocailMedia },
        { model: UserPoint },
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user.get({ plain: true }),
      commentsCount: user.comments?.length || 0,
      articlesViewed: user.viewedArticles?.length || 0,
      questionsViewed: user.viewedQuestions?.length || 0,
      pointsHistoryCount: user.pointsHistory?.length || 0,
    };
  }

  async chnageUserActiveStatus(userId: number) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('هذا الحساب غير موجدود');
    }
    user.active = !user.active;
    return user.save();
  }

  async requestCode(dto: UserRequestVerifyCodeDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new NotFoundException('هذا الإيميل غير مستخدم');
    }

    await this.verifuCodeRepo.destroy({ where: { userId: user.id } });

    const codeStr = generateCode(); // مثل: "834291"
    const code = await this.verifuCodeRepo.create({
      userId: user.id,
      code: codeStr,
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // بعد ساعتين
    });

    await code.save();

    const emailHtml = `
    <div style="font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 20px; background-color: #f8f8fc;">
      <h2 style="color: #c40044;">رمز التحقق الخاص بك</h2>
      <p>مرحبًا ${user.name || ''}،</p>
      <p>لقد طلبت إعادة تعيين كلمة المرور. الرجاء استخدام رمز التحقق التالي:</p>
      <div style="font-size: 24px; font-weight: bold; color: #1e1e2f; margin: 20px 0;">${codeStr}</div>
      <p>ينتهي صلاحية هذا الرمز بعد ساعتين.</p>
      <p style="color: #6c6c80;">إذا لم تطلب هذا الرمز، يمكنك تجاهل هذا البريد.</p>
    </div>
  `;

    return await sendEmail({
      to: user.email,
      subject: '🔐 رمز التحقق لإعادة تعيين كلمة المرور',
      html: emailHtml,
    });
  }

  async verifyCodeCheck(dto: UserSendVerifyCodeDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new NotFoundException('هذا الإيميل غير مستخدم');
    }
    const savedCode = await this.verifuCodeRepo.findOne({
      where: {
        code: dto.code,
        userId: user.id,
        expiresAt: {
          [Op.gt]: new Date(), // شرط أن يكون التاريخ لاحق للوقت الحالي
        },
      },
    });
    if (!savedCode) {
      throw new NotFoundException('الرجاء إدخال رمز التحقق الصحيح');
    }
    savedCode.isVerify = true;
    return await savedCode.save();
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new NotFoundException('هذا الإيميل غير مستخدم');
    }
    const savedCode = await this.verifuCodeRepo.findOne({
      where: { userId: user.id, isVerify: true },
    });
    if (!savedCode) {
      throw new NotFoundException('يتعذر إعادة تعيين كلمة المرور');
    }
    user.password = await hashPassword(dto.password);
    await user.save();
    return await savedCode.destroy();
  }

  async deleteUserAccountByAdmin(userId: number) {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('هذا الحساب غير متوفر');
    }
    const imagePath = user.image;
    await user.destroy();
    return await removeImage(user.image);
  }
}
