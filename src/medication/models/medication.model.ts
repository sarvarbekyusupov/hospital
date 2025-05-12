import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { PrescriptionItem } from "../../prescription_item/models/prescription_item.model";

interface IMedicationCreationAttrs {
  name: string;
  manufacturer?: string;
  dosage_form?: string;
  stock_count?: number;
  price?: number;
}

@Table({ tableName: "medications" })
export class Medication extends Model<Medication, IMedicationCreationAttrs> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare manufacturer: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare dosage_form: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare stock_count: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  declare price: number;

  @HasMany(() => PrescriptionItem)
  declare prescriptionItems: PrescriptionItem[];
}
