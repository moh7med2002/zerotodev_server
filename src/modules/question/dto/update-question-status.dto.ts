import { IsEnum } from 'class-validator';
import { ItemStatus } from 'src/common/enums/itemStatus';

export class UpdateQuestionStatusDto {
  @IsEnum(ItemStatus)
  status: ItemStatus;
}
