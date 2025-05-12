import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Patient } from "../../patient/models/patient.model";
import { Doctor } from "../../doctor/models/doctor.model";
import { PrescriptionItem } from "../../prescription_item/models/prescription_item.model";

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
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare patient_id: number;

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare doctor_id: number;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: DataType.NOW })
  declare created_at: Date;

  @BelongsTo(() => Patient)
  declare patient: Patient;

  @BelongsTo(() => Doctor)
  declare doctor: Doctor;

  @HasMany(() => PrescriptionItem)
  declare prescriptionItems: PrescriptionItem[];
}
