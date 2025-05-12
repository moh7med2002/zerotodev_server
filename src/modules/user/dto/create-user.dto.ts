import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class createUserDto {
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsNotEmpty()
    @IsString()
    name:string

    @IsOptional()
    @IsString()
    @MaxLength(255, { message: 'يجب ألا يزيد البيو عن 255 حرفًا' })
    bio:string
}