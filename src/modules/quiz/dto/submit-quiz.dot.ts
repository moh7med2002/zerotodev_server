import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber } from "class-validator"

export class SubmitQuizDto{
    @IsArray()
    @ArrayNotEmpty()
    answers:number[]

    @IsNotEmpty()
    @IsNumber()
    quizId:number
}