import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(15, { message: 'يجب ان لا تزيد اسم المهارة عن 15 حرفا' })
  title: string;
}
