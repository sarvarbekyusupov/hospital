// models/medical-file.model.ts
import { Table, Column, Model, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IMedicalFileCreationAttrs {
  record_id: number;
  file_path: string;
  file_type: string;
  uploaded_at: Date;
}

@Table({ tableName: "medical_files" })
export class MedicalFile extends Model<MedicalFile, IMedicalFileCreationAttrs> {
  @ApiProperty({ example: 1, description: "Medical file ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 123, description: "Related medical record ID" })
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare record_id: number;

  @ApiProperty({
    example: "/uploads/lab_result.pdf",
    description: "Path to the file",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare file_path: string;

  @ApiProperty({ example: "pdf", description: "Type of the file" })
  @Column({ type: DataType.STRING, allowNull: true })
  declare file_type: string;

  @ApiProperty({
    example: "2024-06-01T10:00:00.000Z",
    description: "Upload date",
  })
  @Column({ type: DataType.DATE, allowNull: true })
  declare uploaded_at: Date;
}
