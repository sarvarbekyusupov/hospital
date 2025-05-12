// models/patient.model.ts
import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Appointment } from "../../appointment/models/appointment.model";
import { Payment } from "../../payment/models/payment.model";
import { MedicalRecord } from "../../medical_record/models/medical_record.model";
import { LabTest } from "../../lab_test/models/lab_test.model";
import { Prescription } from "../../prescription/models/prescription.model";

interface IPatientCreationAttrs {
  full_name: string;
  birth_date: Date;
  gender: string;
  phone: string;
  email: string;
  address: string;
  insurance_provider: string;
  emergency_contact: string;
  hashed_password: string;
  role:string
}

@Table({ tableName: "patients" })
export class Patient extends Model<Patient, IPatientCreationAttrs> {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: "John Doe" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare full_name: string;

  @ApiProperty({ example: "1990-01-01" })
  @Column({ type: DataType.DATE, allowNull: true })
  declare birth_date: Date;

  @ApiProperty({ example: "male" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare gender: string;

  @ApiProperty({ example: "+1234567890" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare phone: string;

  @ApiProperty({ example: "john@example.com" })
  @Column({ type: DataType.STRING, allowNull: true, unique:true })
  declare email: string;

  @ApiProperty({ example: "123 Main St" })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare address: string;

  @ApiProperty({ example: "BlueCross" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare insurance_provider: string;

  @ApiProperty({ example: "+987654321" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare emergency_contact: string;

  @ApiProperty({ example: true })
  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  declare is_active: boolean;

  @ApiProperty({ example: "hashedpassword123" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;
  declare role: string;

  @HasMany(() => Appointment)
  appointments: Appointment[];

  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => MedicalRecord)
  medicalRecords: MedicalRecord[];

  @HasMany(() => LabTest)
  labTests: LabTest[];

  @HasMany(() => Prescription)
  prescriptions: Prescription[];

}
