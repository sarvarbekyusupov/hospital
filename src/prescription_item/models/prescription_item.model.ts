// models/prescription-item.model.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IPrescriptionItemCreationAttrs {
  prescription_id: number;
  medication_id: number;
  dosage: string;
  frequency: string;
  duration: string;
}

@Table({ tableName: "prescription_items" })
export class PrescriptionItem extends Model<
  PrescriptionItem,
  IPrescriptionItemCreationAttrs
> {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 10 })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare prescription_id: number;

  @ApiProperty({ example: 5 })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare medication_id: number;

  @ApiProperty({ example: "500mg", description: "Dosage of the medication" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare dosage: string;

  @ApiProperty({ example: "Twice a day", description: "Frequency of intake" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare frequency: string;

  @ApiProperty({
    example: "5 days",
    description: "Duration of the prescription",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare duration: string;
}
