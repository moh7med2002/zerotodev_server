import { IsEnum } from 'class-validator';
import { ItemStatus } from 'src/common/enums/itemStatus';

export class UpdateQuizStatusDto {
  @IsEnum(ItemStatus)
  status: ItemStatus;
}
