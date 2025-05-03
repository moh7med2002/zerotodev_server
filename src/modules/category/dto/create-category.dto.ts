import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class createCategoryDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(32)
    name:string
}