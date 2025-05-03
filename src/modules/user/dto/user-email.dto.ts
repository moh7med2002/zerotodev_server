import { IsEmail } from "class-validator";

export class UserEmailDto {
    @IsEmail()
    newEmail:string;
}