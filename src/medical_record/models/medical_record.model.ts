import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Patient } from "../../patient/models/patient.model";
import { Doctor } from "../../doctor/models/doctor.model";

interface IMedicalRecordCreationAttrs {
  patient_id: number;
  doctor_id: number;
  diagnosis?: string;
  treatment?: string;
  created_at?: Date;
}

@Table({ tableName: "medical_records" })
export class MedicalRecord extends Model<
  MedicalRecord,
  IMedicalRecordCreationAttrs
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare patient_id: number;

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare doctor_id: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare diagnosis: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare treatment: string;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: DataType.NOW })
  declare created_at: Date;

  @BelongsTo(() => Patient)
  declare patient: Patient;

  @BelongsTo(() => Doctor)
  declare doctor: Doctor;
}
