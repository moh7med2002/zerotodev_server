import { IsNotEmpty, IsString } from "class-validator";

export class UserPasswordDto {
    @IsString()
    @IsNotEmpty()
    newPassword:string;

    @IsString()
    @IsNotEmpty()
    oldPassword:string;
}