import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class createArtcileDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(120)
    title:string

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    @MaxLength(255)
    headline:string

    @IsOptional()
    @IsString()
    image?:string

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    content:string

    @IsString()
    @IsNotEmpty()
    categoryId:number
}