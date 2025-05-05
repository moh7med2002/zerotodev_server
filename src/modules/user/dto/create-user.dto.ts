import {IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
    bio:string
}