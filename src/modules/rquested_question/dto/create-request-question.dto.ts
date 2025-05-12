import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRequestQuestionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255, { message: 'يجب ألا يزيد السؤال عن 255 حرفًا' })
    title:string
}