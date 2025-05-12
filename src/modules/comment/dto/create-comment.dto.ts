import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class createCommentDto{
    @IsOptional()
    @IsNumber()
    questionId:number

    @IsOptional()
    @IsNumber()
    articleId:number

    @IsString()
    @IsNotEmpty()
    @MaxLength(255, { message: 'يجب ألا يزيد التعليق عن 255 حرفًا' })
    comment:string
}