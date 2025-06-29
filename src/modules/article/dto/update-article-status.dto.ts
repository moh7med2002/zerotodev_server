import { IsEnum } from 'class-validator';
import { ItemStatus } from 'src/common/enums/itemStatus';

export class UpdateArtcileStatusDto {
  @IsEnum(ItemStatus, {
    message: 'حالة المقال غير صحيحة، الرجاء اختيار قيمة مناسبة',
  })
  status: ItemStatus;
}
