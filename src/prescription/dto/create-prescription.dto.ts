import { IsInt, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePrescriptionDto {
  @ApiProperty({ example: 1, description: "ID of the patient" })
  @IsInt()
  patient_id: number;

  @ApiProperty({ example: 2, description: "ID of the prescribing doctor" })
  @IsInt()
  doctor_id: number;

  @ApiProperty({
    example: "2024-05-07T10:00:00Z",
    description: "Date when the prescription was created",
    required: false,
  })
  
  created_at?: Date;
}
