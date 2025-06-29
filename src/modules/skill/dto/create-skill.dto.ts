import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty({ message: 'اسم المهارة مطلوب' })
  @IsString({ message: 'اسم المهارة يجب أن يكون نصًا' })
  @MaxLength(15, { message: 'يجب ألا يزيد اسم المهارة عن 15 حرفًا' })
  title: string;
}
