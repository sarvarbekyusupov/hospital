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
import { Payment } from "../../payment/models/payment.model";

interface IAppointmentCreationAttrs {
  patient_id: number;
  doctor_id: number;
  appointment_time: Date;
  status?: string;
  notes?: string;
}

@Table({ tableName: "appointments" })
export class Appointment extends Model<Appointment, IAppointmentCreationAttrs> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare patient_id: number;

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare doctor_id: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare appointment_time: Date;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: "scheduled" })
  declare status: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare notes: string;

  @BelongsTo(() => Patient)
  declare patient: Patient;

  @BelongsTo(() => Doctor)
  declare doctor: Doctor;

  @HasMany(() => Payment)
  declare payments: Payment[];
}
