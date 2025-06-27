import { IsEnum } from 'class-validator';
import { ItemStatus } from 'src/common/enums/itemStatus';

export class UpdateQuestionStatusDto {
  @IsEnum(ItemStatus, {
    message: 'حالة السؤال غير صحيحة، الرجاء اختيار قيمة مناسبة',
  })
  status: ItemStatus;
}
