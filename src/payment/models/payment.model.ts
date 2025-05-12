import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Patient } from "../../patient/models/patient.model";
import { Appointment } from "../../appointment/models/appointment.model";

interface IPaymentCreationAttrs {
  patient_id: number;
  appointment_id: number;
  amount?: number;
  method?: string;
  status?: string;
  paid_at?: Date;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentCreationAttrs> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare patient_id: number;

  @ForeignKey(() => Appointment)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare appointment_id: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  declare amount: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare method: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: "paid" })
  declare status: string;

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: DataType.NOW })
  declare paid_at: Date;

  @BelongsTo(() => Patient)
  declare patient: Patient;

  @BelongsTo(() => Appointment)
  declare appointment: Appointment;
}
