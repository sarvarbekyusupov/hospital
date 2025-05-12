import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Prescription } from "../../prescription/models/prescription.model";
import { Medication } from "../../medication/models/medication.model";

interface IPrescriptionItemCreationAttrs {
  prescription_id: number;
  medication_id: number;
  dosage?: string;
  frequency?: string;
  duration?: string;
}

@Table({ tableName: "prescription_items" })
export class PrescriptionItem extends Model<
  PrescriptionItem,
  IPrescriptionItemCreationAttrs
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Prescription)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare prescription_id: number;

  @ForeignKey(() => Medication)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare medication_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare dosage: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare frequency: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare duration: string;

  @BelongsTo(() => Prescription)
  declare prescription: Prescription;

  @BelongsTo(() => Medication)
  declare medication: Medication;
}
