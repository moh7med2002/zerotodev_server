import { Body, Controller, FileTypeValidator, ParseFilePipe, Patch, Post, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @UseInterceptors(createImageInterceptor('image', 'images'))
  @UseFilters(MulterExceptionFilter)
  async signUpUser(@Body() body:createUserDto,@UploadedFile() file?: Express.Multer.File)
  {
    const imageUrl = file ? `/images/${file.filename}` : undefined;
    return this.userService.signUp(body,imageUrl)
  }

  @Post('login')
  async loginUser(@Body() body:loginUserDto)
  {
    return this.userService.login(body)
  }

  @Serilaize(UserDto)
  @Patch('email')
  @UseGuards(UserGuard)
  changeUserEmail(@Body() body:UserEmailDto,@CurrentUser() user:User)
  {
    return this.userService.changeEmail(body.newEmail,+user.id)
  }
  
  @Serilaize(UserDto)
  @Patch('password')
  @UseGuards(UserGuard)
  changeUserPassword(@Body() body:UserPasswordDto,@CurrentUser() user:User)
  {
      return this.userService.changePassword(body,+user.id)
  }

}