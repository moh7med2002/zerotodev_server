import { IsEnum } from 'class-validator';
import { ItemStatus } from 'src/common/enums/itemStatus';

export class UpdateQuizStatusDto {
  @IsEnum(ItemStatus, {
    message: 'حالة الاختبار غير صحيحة، الرجاء اختيار قيمة مناسبة',
  })
  status: ItemStatus;
}
