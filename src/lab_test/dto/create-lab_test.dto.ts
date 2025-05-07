import { IsInt, IsString, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLabTestDto {
  @ApiProperty({ description: "ID of the patient" })
  @IsInt()
  patient_id: number;

  @ApiProperty({ description: "ID of the doctor who ordered the test" })
  @IsInt()
  doctor_id: number;

  @ApiProperty({ description: "Type of lab test (e.g., blood, urine, x-ray)" })
  @IsString()
  test_type: string;

  @ApiProperty({
    description: "Current status of the test (e.g., pending, completed)",
  })
  @IsString()
  status: string;

  @ApiProperty({ description: "Result of the test (can be empty if pending)" })
  @IsString()
  result: string;

  @ApiProperty({ description: "Date the test was conducted (ISO 8601 format)" })
  @IsDateString()
  date: Date;
}
