import { Column, Model, Table, DataType, ForeignKey, BelongsTo, AllowNull } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

@Table({ tableName: 'requested_questions' })
export class RequestedQuestion extends Model {
    @Column({ autoIncrement: true, primaryKey: true })
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    title: string;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @BelongsTo(() => User)
    user: User;
}
