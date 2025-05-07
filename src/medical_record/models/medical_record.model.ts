import { Table, Column, Model, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IMedicalRecordCreationAttrs {
  patient_id: number;
  doctor_id: number;
  diagnosis: string;
  treatment: string;
  created_at: Date;
}

@Table({ tableName: "medical_records", timestamps: false })
export class MedicalRecord extends Model<
  MedicalRecord,
  IMedicalRecordCreationAttrs
> {
  @ApiProperty({ example: 1, description: "Medical record ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 101, description: "Patient ID" })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare patient_id: number;

  @ApiProperty({ example: 45, description: "Doctor ID" })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare doctor_id: number;

  @ApiProperty({ example: "Pneumonia", description: "Diagnosis information" })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare diagnosis: string;

  @ApiProperty({
    example: "Antibiotics for 7 days",
    description: "Treatment plan",
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare treatment: string;

  @ApiProperty({
    example: "2024-05-06T14:30:00.000Z",
    description: "Creation timestamp",
  })
  @Column({ type: DataType.DATE, allowNull: true })
  declare created_at: Date;
}
