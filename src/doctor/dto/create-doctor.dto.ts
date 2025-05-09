import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsInt,
  IsBoolean,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDoctorDto {
  @ApiProperty({ description: "Full name of the doctor" })
  @IsString()
  @MinLength(2)
  full_name: string;

  @ApiProperty({
    description: "Specialization of the doctor (e.g., cardiologist)",
  })
  @IsString()
  specialization: string;

  @ApiProperty({ description: "Phone number of the doctor" })
  phone: string;

  @ApiProperty({ description: "Email address of the doctor" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "ID of the department the doctor belongs to" })
  @IsInt()
  department_id: number;

  @ApiProperty({ description: "Room number assigned to the doctor" })
  @IsString()
  room_number: string;

  @ApiProperty({
    description: "Password for doctor account (min 6 characters)",
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: "Password confirmation (must match password)" })
  @IsString()
  @MinLength(6)
  confirm_password: string;

 
}
