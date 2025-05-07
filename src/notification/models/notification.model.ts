import { Table, Column, Model, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface INotificationCreationAttrs {
  user_id: number;
  user_type: string;
  message: string;
  status: string;
  sent_at: Date;
}

@Table({ tableName: "notifications" })
export class Notification extends Model<
  Notification,
  INotificationCreationAttrs
> {
  @ApiProperty({ example: 1, description: "Notification ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: 12,
    description: "ID of the user receiving the notification",
  })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare user_id: number;

  @ApiProperty({
    example: "doctor",
    description: "Type of user (e.g., doctor, patient)",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare user_type: string;

  @ApiProperty({
    example: "Your appointment has been confirmed.",
    description: "Notification message",
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare message: string;

  @ApiProperty({
    example: "sent",
    description: "Notification status (e.g., sent, pending)",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare status: string;

  @ApiProperty({
    example: "2024-05-07T10:30:00Z",
    description: "Timestamp when notification was sent",
  })
  @Column({ type: DataType.DATE, allowNull: true })
  declare sent_at: Date;
}
