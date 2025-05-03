import { IsEnum } from 'class-validator';
import { ItemStatus } from 'src/common/enums/itemStatus';

export class UpdateArtcileStatusDto {
  @IsEnum(ItemStatus)
  status: ItemStatus;
}
