import {
  Column,
  Model,
  Table,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({ tableName: 'codes' })
export class VerifyCode extends Model {
  @Column({ allowNull: false, autoIncrement: true, primaryKey: true })
  id: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  code: string;

  @AllowNull(false)
  @Column({ type: DataType.DATE })
  expiresAt: Date;

  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isVerify: Boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
