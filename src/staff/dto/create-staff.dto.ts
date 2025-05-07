import { IsString, IsEmail, IsPhoneNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStaffDto {
  @ApiProperty({ example: "Jane Doe" })
  @IsString()
  full_name: string;

  @ApiProperty({ example: "Receptionist" })
  @IsString()
  role: string;

  @ApiProperty({ example: "+1234567890" })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: "jane.doe@example.com" })
  @IsEmail()
  email: string;
}
