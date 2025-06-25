import { repositories } from 'src/common/enums/repositories';
import { User } from './entities/user.entity';
import { VerifyCode } from './entities/UserVerifyCode';

export const UserProvider = [
  {
    provide: repositories.user_repository,
    useValue: User,
  },
];

export const VerifyCodeProvider = [
  {
    provide: repositories.verify_code_repository,
    useValue: VerifyCode,
  },
];
