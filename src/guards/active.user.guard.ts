// guards/active-user.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class ActiveUserGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenUser = request.currentUser;

    if (!tokenUser?.userId) {
      throw new ForbiddenException('لا يمكن تحديد هوية المستخدم.');
    }

    const user = await this.userService.findById(tokenUser.userId);

    if (!user) {
      throw new ForbiddenException('المستخدم غير موجود.');
    }

    if (!user.active) {
      throw new ForbiddenException(
        'تم تقليل صلاحيات حسابك . يرجى التواصل معنا عبر إحدى منصات التواصل الإجتماعي للمراجعة',
      );
    }

    // Optional: update the request with the full user
    request.currentUser = tokenUser;

    return true;
  }
}
