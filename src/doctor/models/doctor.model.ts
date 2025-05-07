// models/doctor.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Department } from "../../departments/models/department.model"; // Adjust path if needed

interface IDoctorCreationAttrs {
  full_name: string;
  specialization: string;
  phone: string;
  email: string;
  department_id: number;
  room_number: string;
  hashed_password: string;
  is_active: boolean;
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
}
