import { IsNotEmpty, IsString } from "class-validator";

export class UserPasswordDto {
    @IsString()
    @IsNotEmpty()
    newpassword:string;

    @IsString()
    @IsNotEmpty()
    oldPassword:string;
}