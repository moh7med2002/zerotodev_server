import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRequestQuestionDto {
  @IsString({ message: 'السؤال يجب أن يكون نصًا' })
  @IsNotEmpty({ message: 'السؤال مطلوب' })
  @MaxLength(255, { message: 'يجب ألا يزيد السؤال عن 255 حرفًا' })
  title: string;
}
