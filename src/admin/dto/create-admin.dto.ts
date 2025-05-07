import { IsString, IsEmail, MinLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({ description: "Full name of the admin" })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: "Email address of the admin" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Password (at least 6 characters)" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ description: "Password confirmation (must match password)" })
  @IsString()
  @MinLength(6)
  confirm_password: string;

  @ApiProperty({ description: "Role of the admin (e.g., superadmin, doctor)" })
  @IsString()
  role: string;
}
