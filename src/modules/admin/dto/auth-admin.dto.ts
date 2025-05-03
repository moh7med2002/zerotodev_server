import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class authAdminDto {
    @IsEmail()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
}