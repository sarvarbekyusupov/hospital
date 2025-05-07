import { IsInt, IsDateString, IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDto {
  @ApiProperty({ description: "ID of the patient" })
  @IsInt()
  patient_id: number;

  @ApiProperty({ description: "ID of the doctor" })
  @IsInt()
  doctor_id: number;

  @ApiProperty({ description: "Scheduled appointment time (ISO 8601 format)" })
  @IsDateString()
  appointment_time: Date;

  @ApiProperty({
    description:
      "Status of the appointment (e.g., scheduled, completed, canceled)",
  })
  @IsString()
  status: string;

  @ApiProperty({
    description: "Optional notes related to the appointment",
    required: false,
  })
  @IsOptional()
  @IsString()
  notes: string;
}
