import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';

@Table({ tableName: 'social_media' })
export class SocailMedia extends Model {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  url: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
