// models/appointment.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
// import { Patient } from "./patient.model"; // Update path accordingly
// import { Doctor } from "./doctor.model"; // Update path accordingly

interface IAppointmentCreationAttrs {
  patient_id: number;
  doctor_id: number;
  appointment_time: Date;
  status: string;
  notes: string;
}

@Table({ tableName: "appointments" })
export class Appointment extends Model<Appointment, IAppointmentCreationAttrs> {
  @ApiProperty({ example: 1, description: "Appointment ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 2, description: "Patient ID" })
//   @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare patient_id: number;

  @ApiProperty({ example: 4, description: "Doctor ID" })
//   @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare doctor_id: number;

  @ApiProperty({
    example: "2025-05-07T14:30:00Z",
    description: "Appointment time",
  })
  @Column({ type: DataType.DATE, allowNull: true })
  declare appointment_time: Date;

  @ApiProperty({
    example: "scheduled",
    description: "Status of the appointment",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare status: string;

  @ApiProperty({
    example: "Follow-up in two weeks",
    description: "Additional notes",
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare notes: string;
}
