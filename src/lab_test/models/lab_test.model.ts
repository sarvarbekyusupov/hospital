// models/lab-test.model.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface ILabTestCreationAttrs {
  patient_id: number;
  doctor_id: number;
  test_type: string;
  status: string;
  result: string;
  date: Date;
}

@Table({ tableName: "lab_tests" })
export class LabTest extends Model<LabTest, ILabTestCreationAttrs> {
  @ApiProperty({ example: 1, description: "Lab test ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 5, description: "Patient ID" })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare patient_id: number;

  @ApiProperty({ example: 2, description: "Doctor ID" })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare doctor_id: number;

  @ApiProperty({ example: "Blood Test", description: "Type of the test" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare test_type: string;

  @ApiProperty({ example: "Pending", description: "Status of the test" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare status: string;

  @ApiProperty({
    example: "All values normal",
    description: "Result of the test",
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare result: string;

  @ApiProperty({
    example: "2024-05-01T10:00:00.000Z",
    description: "Date of the test",
  })
  @Column({ type: DataType.DATE, allowNull: true })
  declare date: Date;
}
