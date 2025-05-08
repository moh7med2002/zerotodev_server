import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class createCommentDto{
    @IsOptional()
    @IsNumber()
    questionId:number

    @IsOptional()
    @IsNumber()
    articleId:number

    @IsString()
    @IsNotEmpty()
    comment:string
}