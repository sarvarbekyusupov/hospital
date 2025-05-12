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

interface ILabTestCreationAttrs {
  patient_id: number;
  doctor_id: number;
  test_type?: string; // Optional test_type
  status?: string; // Optional status
  result?: string; // Optional result
  date?: Date; // Optional date
}

@Table({ tableName: "lab_tests", timestamps: true }) // Default timestamps enabled
export class LabTest extends Model<LabTest, ILabTestCreationAttrs> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare patient_id: number;

  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare doctor_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare test_type?: string; // Optional field

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: "pending" })
  declare status: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare result?: string; // Optional field

  @Column({ type: DataType.DATE, allowNull: true })
  declare date?: Date; // Optional field

  @BelongsTo(() => Patient)
  declare patient: Patient;

  @BelongsTo(() => Doctor)
  declare doctor: Doctor;
}
