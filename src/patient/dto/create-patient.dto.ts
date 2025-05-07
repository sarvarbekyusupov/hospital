import {
  IsString,
  IsDate,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsDateString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePatientDto {
  @ApiProperty({ description: "Full name of the patient" })
  @IsString()
  full_name: string;

  @ApiProperty({
    description: "Birth date of the patient",
    type: String,
    format: "date",
  })
  @IsDateString()
  birth_date: Date;

  @ApiProperty({ description: "Gender of the patient" })
  @IsString()
  gender: string;

  @ApiProperty({ description: "Phone number of the patient" })
  phone: string;

  @ApiProperty({ description: "Email of the patient" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Residential address" })
  @IsString()
  address: string;

  @ApiProperty({ description: "Insurance provider name" })
  @IsString()
  insurance_provider: string;

  @ApiProperty({ description: "Emergency contact phone number" })
  @IsString()
  emergency_contact: string;

  @ApiProperty({
    description: "Refresh token for authentication",
    required: false,
  })
  @IsOptional()
  @IsString()
  refresh_token: string;

  @ApiProperty({ description: "Whether the patient is active" })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({ description: "Password" })
  @IsString()
  password: string;

  @ApiProperty({ description: "Password confirmation" })
  @IsString()
  confirm_password: string;
}
