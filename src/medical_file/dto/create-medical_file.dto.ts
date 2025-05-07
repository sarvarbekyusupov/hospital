import { IsInt, IsString, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicalFileDto {
  @ApiProperty({ description: "Associated medical record ID" })
  @IsInt()
  record_id: number;

  @ApiProperty({ description: "Path to the uploaded file" })
  @IsString()
  file_path: string;

  @ApiProperty({ description: "Type of the file (e.g., pdf, image)" })
  @IsString()
  file_type: string;

  @ApiProperty({ description: "Timestamp when the file was uploaded" })
  @IsDateString()
  uploaded_at: Date;
}
