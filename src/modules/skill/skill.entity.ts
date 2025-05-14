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

@Table({ tableName: 'user_skill' })
export class Skill extends Model {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
