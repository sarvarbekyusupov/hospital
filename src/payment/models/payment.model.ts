// models/payment.model.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IPaymentCreationAttrs {
  patient_id: number;
  appointment_id: number;
  amount: number;
  method: string;
  status: string;
  paid_at: Date;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentCreationAttrs> {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 10 })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare patient_id: number;

  @ApiProperty({ example: 5 })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare appointment_id: number;

  @ApiProperty({ example: 99.99 })
  @Column({ type: DataType.DECIMAL, allowNull: true })
  declare amount: number;

  @ApiProperty({ example: "credit_card" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare method: string;

  @ApiProperty({ example: "paid" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare status: string;

  @ApiProperty({ example: "2024-05-07T14:30:00Z" })
  @Column({ type: DataType.DATE, allowNull: true })
  declare paid_at: Date;
}
