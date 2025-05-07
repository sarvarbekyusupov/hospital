// models/medication.model.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IMedicationCreationAttrs {
  name: string;
  manufacturer: string;
  dosage_form: string;
  stock_count: number;
  price: number;
}

@Table({ tableName: "medications" })
export class Medication extends Model<Medication, IMedicationCreationAttrs> {
  @ApiProperty({ example: 1, description: "Medication ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: "Amoxicillin", description: "Medication name" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({ example: "Pfizer", description: "Manufacturer name" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare manufacturer: string;

  @ApiProperty({ example: "Capsule", description: "Dosage form" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare dosage_form: string;

  @ApiProperty({ example: 100, description: "Number of units in stock" })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare stock_count: number;

  @ApiProperty({ example: 9.99, description: "Price per unit" })
  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  declare price: number;
}
