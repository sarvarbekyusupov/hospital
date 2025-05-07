// models/staff.model.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IStaffCreationAttrs {
  full_name: string;
  role: string;
  phone: string;
  email: string;
}

@Table({ tableName: "staffs" })
export class Staff extends Model<Staff, IStaffCreationAttrs> {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: "Jane Doe" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare full_name: string;

  @ApiProperty({ example: "Receptionist", description: "Staff role" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare role: string;

  @ApiProperty({ example: "+123456789" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare phone: string;

  @ApiProperty({ example: "jane.doe@clinic.com" })
  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  declare email: string;
}
