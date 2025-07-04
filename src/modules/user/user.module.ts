import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProvider, VerifyCodeProvider } from './user.repository';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './interceptors/user.interceptor';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    ...UserProvider,
    ...VerifyCodeProvider,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
