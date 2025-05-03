import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminProvider } from './admin.repository';

@Module({
  controllers: [AdminController],
  providers: [AdminService,...AdminProvider],
})
export class AdminModule {}
