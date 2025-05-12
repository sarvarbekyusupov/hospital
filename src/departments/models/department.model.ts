import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Doctor } from "../../doctor/models/doctor.model";
import { Staff } from "../../staff/models/staff.model";

interface IDepartmentCreationAttrs {
  name: string;
  description: string;
}

@Table({ tableName: "departments" })
export class Department extends Model<Department, IDepartmentCreationAttrs> {
  @ApiProperty({ example: 1, description: "Department ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: "Cardiology", description: "Department name" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({
    example: "Heart and blood vessel related treatments",
    description: "Department description",
  })
  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @HasMany(() => Doctor)
  declare doctors: Doctor[];

  @HasMany(() => Staff)
  declare staffs: Staff[];
}
