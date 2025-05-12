// models/doctor.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Department } from "../../departments/models/department.model"; // Adjust path if needed
import { Appointment } from "../../appointment/models/appointment.model";
import { Prescription } from "../../prescription/models/prescription.model";
import { LabTest } from "../../lab_test/models/lab_test.model";
import { MedicalRecord } from "../../medical_record/models/medical_record.model";

interface IDoctorCreationAttrs {
  full_name: string;
  specialization: string;
  phone: string;
  email: string;
  department_id: number;
  room_number: string;
  hashed_password: string;
}

@Table({ tableName: "doctors" })
export class Doctor extends Model<Doctor, IDoctorCreationAttrs> {
  @ApiProperty({ example: 1, description: "Doctor ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: "Dr. John Doe",
    description: "Full name of the doctor",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name: string;

  @ApiProperty({
    example: "Cardiologist",
    description: "Doctors specialization",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare specialization: string;

  @ApiProperty({ example: "+1234567890", description: "Phone number" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare phone: string;

  @ApiProperty({ example: "dr.john@example.com", description: "Email address" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @ApiProperty({ example: 2, description: "Department ID" })
  @ForeignKey(() => Department)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare department_id: number;

  @ApiProperty({ example: "Room 101", description: "Room number" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare room_number: string;

  @ApiProperty({
    example: "hashed_password_here",
    description: "Hashed password",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare hashed_password: string;

  @ApiProperty({ example: true, description: "Is the doctor active?" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  declare role: string;

  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

    @HasMany(() => Appointment)
    appointments: Appointment[];

    @HasMany(() => Prescription)
    prescriptions: Prescription[];

    @HasMany(() => LabTest)
    labTests: LabTest[];

    @HasMany(() => MedicalRecord)
    medicalRecords: MedicalRecord[];

    @BelongsTo(() => Department)
    department: Department;
}

// import {
//   Table,
//   Column,
//   Model,
//   DataType,
//   ForeignKey,
//   BelongsTo,
//   HasMany,
// } from "sequelize-typescript";
// import { Department } from "../../departments/models/department.model";
// import { Appointment } from "../../appointment/models/appointment.model";
// import { MedicalRecord } from "../../medical_record/models/medical_record.model";
// import { LabTest } from "../../lab_test/models/lab_test.model";
// import { Prescription } from "../../prescription/models/prescription.model";

// // Updated interface to reflect optional fields and exclude `id` (auto-incremented)
// interface IDoctorCreationAttrs {
//   full_name: string;
//   specialization?: string;
//   phone?: string;
//   email: string;
//   department_id: number;
//   room_number?: string;
//   hashed_password: string;
//   is_active?: boolean;
//   role?: string;
//   refresh_token?: string;
//   activation_link?: string;
// }

// @Table({ tableName: "doctors" })
// export class Doctor extends Model<Doctor, IDoctorCreationAttrs> {
//   @Column({
//     type: DataType.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   })
//   declare id: number;

//   @Column({ type: DataType.STRING, allowNull: false })
//   full_name: string;

//   @Column({ type: DataType.STRING, allowNull: true })
//   specialization: string;

//   @Column({ type: DataType.STRING, allowNull: true })
//   phone: string;

//   @Column({ type: DataType.STRING, allowNull: false, unique: true })
//   email: string;

//   @ForeignKey(() => Department)
//   @Column({ type: DataType.INTEGER, allowNull: false })
//   department_id: number;

//   @Column({ type: DataType.STRING, allowNull: true })
//   room_number: string;

//   @Column({ type: DataType.STRING, allowNull: false })
//   hashed_password: string;

//   @Column({ type: DataType.BOOLEAN, defaultValue: false })
//   is_active: boolean;

//   @Column({ type: DataType.STRING, allowNull: true, defaultValue :"doctor"})
//   role: string;

//   @Column({ type: DataType.STRING, allowNull: true })
//   refresh_token: string;

//   @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
//   activation_link: string;

//   @HasMany(() => Appointment)
//   appointments: Appointment[];

//   @HasMany(() => Prescription)
//   prescriptions: Prescription[];

//   @HasMany(() => LabTest)
//   labTests: LabTest[];

//   @HasMany(() => MedicalRecord)
//   medicalRecords: MedicalRecord[];

//   @BelongsTo(() => Department)
//   department: Department;
// }
