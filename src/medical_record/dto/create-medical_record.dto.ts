import { IsInt, IsString, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicalRecordDto {
  @ApiProperty({ description: "ID of the patient" })
  @IsInt()
  patient_id: number;

  @ApiProperty({ description: "ID of the doctor" })
  @IsInt()
  doctor_id: number;

  @ApiProperty({ description: "Diagnosis details" })
  @IsString()
  diagnosis: string;

  @ApiProperty({ description: "Treatment provided" })
  @IsString()
  treatment: string;

  @ApiProperty({ description: "Date the record was created (ISO 8601 format)" })
  @IsDateString()
  created_at: Date;
}
