// models/staff.model.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Department } from "../../departments/models/department.model";

interface IStaffCreationAttrs {
  full_name: string;
  role: string;
  phone: string;
  email: string;
  hashed_password: string;
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

  @Column({
    type: DataType.STRING,
  })
  declare hashed_password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  declare refresh_token: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @ForeignKey(() => Department)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare department_id: number;

  @BelongsTo(() => Department)
  declare department: Department;
}
