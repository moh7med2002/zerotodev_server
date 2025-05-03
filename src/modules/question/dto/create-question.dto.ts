import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class createQuestionDto {
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
    
    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    content:string
}