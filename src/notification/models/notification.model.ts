import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface INotificationCreationAttrs {
  user_id: number;
  user_type: string;
  message?: string;
  status?: string;
  sent_at?: Date;
}

@Table({ tableName: "notifications" })
export class Notification extends Model<
  Notification,
  INotificationCreationAttrs
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare user_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare user_type: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare message: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: "unread" })
  declare status: string;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: DataType.NOW })
  declare sent_at: Date;
}