import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDepartmentDto {
  @ApiProperty({ description: "Name of the department" })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: "Description of the department" })
  @IsString()
  @MinLength(5)
  description: string;
}
