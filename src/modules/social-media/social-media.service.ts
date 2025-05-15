import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { SocailMedia } from './social-media.entity';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';

@Injectable()
export class SocialMediaService {
  constructor(
    @Inject(repositories.social_media_repository)
    private socialMediaRepo: typeof SocailMedia,
  ) {}

  async createSocialMedia(dto: CreateSocialMediaDto, userId: number) {
    const socialMedia = await this.socialMediaRepo.create({
      url: dto.url,
      userId,
    });
    return socialMedia;
  }

  async deleteSkocialMedia(id: number, userId: number) {
    const socialMedia = await this.socialMediaRepo.findOne({
      where: { id, userId },
    });
    return socialMedia?.destroy();
  }

  getAllByUser(userId:number)
  {
    return this.socialMediaRepo.findAll({where:{userId}})
  }
}
