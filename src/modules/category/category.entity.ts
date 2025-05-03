import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Article } from '../article/article.entity';

@Table({ tableName: 'categories' })
export class Category extends Model {
    @Column({ autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name: string;

    @HasMany(() => Article)
    articles: Article[];
}