import { IsString, MinLength } from "class-validator";

export class CreateRequestQuestionDto {
    @IsString()
    @MinLength(7)
    title:string
}