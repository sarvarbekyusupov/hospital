// models/prescription.model.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IPrescriptionCreationAttrs {
  patient_id: number;
  doctor_id: number;
  created_at?: Date;
}

@Table({ tableName: "prescriptions" })
export class Prescription extends Model<
  Prescription,
  IPrescriptionCreationAttrs
> {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 3 })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare patient_id: number;

  @ApiProperty({ example: 7 })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare doctor_id: number;

  @ApiProperty({ example: "2025-05-07T12:00:00Z" })
  @Column({ type: DataType.DATE, allowNull: true })
  declare created_at: Date;
}
