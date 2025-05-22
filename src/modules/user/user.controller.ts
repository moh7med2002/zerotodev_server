import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { UserEmailDto } from './dto/user-email.dto';
import { UserPasswordDto } from './dto/user-password.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { User } from './entities/user.entity';
import { loginUserDto } from './dto/login-user.dto';
import { UserGuard } from 'src/guards/user.guard';
import { createImageInterceptor } from 'src/common/interceptors/createImage.interceptor';
import { MulterExceptionFilter } from 'src/common/filters/multerException.filter';
import { UserProfileDto } from './dto/user-profile.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AdminUserProfileDto } from './dto/user-profile-admin.dto';
import { TopUserDto } from './dto/top-user.dto';
import { UserPublicProfileDto } from './dto/user-public-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UseInterceptors(createImageInterceptor('image', 'images'))
  @UseFilters(MulterExceptionFilter)
  async signUpUser(
    @Body() body: createUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const imageUrl = file ? `/images/${file.filename}` : undefined;
    return this.userService.signUp(body, imageUrl);
  }

  @Post('login')
  async loginUser(@Body() body: loginUserDto) {
    return this.userService.login(body);
  }

  @UseGuards(UserGuard)
  @Serilaize(UserDto)
  @Patch('email')
  @UseGuards(UserGuard)
  changeUserEmail(@Body() body: UserEmailDto, @CurrentUser() user: User) {
    return this.userService.changeEmail(body.newEmail, +user.id);
  }

  @Serilaize(UserDto)
  @Patch('password')
  @UseGuards(UserGuard)
  changeUserPassword(@Body() body: UserPasswordDto, @CurrentUser() user: User) {
    return this.userService.changePassword(body, +user.id);
  }

  @Serilaize(UserDto)
  @UseGuards(UserGuard)
  @Put('update')
  @UseInterceptors(createImageInterceptor('image', 'images'))
  @UseFilters(MulterExceptionFilter)
  updateProfile(
    @Body() body: Partial<User>,
    @CurrentUser() user: User,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const imageUrl = file ? `/images/${file.filename}` : undefined;
    return this.userService.update(body, user.id, imageUrl);
  }

  @Serilaize(UserProfileDto)
  @UseGuards(UserGuard)
  @Get('current')
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(AdminGuard)
  @Get('/all')
  getAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ) {
    return this.userService.getAllUsers(+page, +limit);
  }

  @Serilaize(AdminUserProfileDto)
  @Get('admin/:userId')
  getAdminProfile(@Param('userId') userId: string) {
    return this.userService.getUserProfileForAdmin(+userId);
  }

  @Serilaize(TopUserDto)
  @Get('top')
  getTopUsers() {
    return this.userService.getTopUsers(20);
  }

  @UseGuards(UserGuard)
  @Get('stats')
  getUserStats(@CurrentUser() user: User) {
    return this.userService.getUserStats(user.id);
  }

  @Serilaize(UserPublicProfileDto)
  @Get('profile/:id')
  getUserPublicProfile(@Param('id') id: string) {
    return this.userService.getUserPublicProfile(+id);
  }
}
