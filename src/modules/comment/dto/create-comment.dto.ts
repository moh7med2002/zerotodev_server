import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class createCommentDto {
  @IsOptional()
  @IsNumber({}, { message: 'معرّف السؤال يجب أن يكون رقمًا' })
  questionId: number;

  @IsOptional()
  @IsNumber({}, { message: 'معرّف المقال يجب أن يكون رقمًا' })
  articleId: number;

  @IsString({ message: 'التعليق يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'التعليق مطلوب' })
  @MaxLength(255, { message: 'يجب ألا يزيد التعليق عن 255 حرفًا' })
  comment: string;
}
