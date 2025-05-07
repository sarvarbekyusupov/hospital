import { IsString, IsInt, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicationDto {
  @ApiProperty({ description: "Name of the medication" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Manufacturer of the medication" })
  @IsString()
  manufacturer: string;

  @ApiProperty({ description: "Dosage form (e.g., tablet, syrup)" })
  @IsString()
  dosage_form: string;

  @ApiProperty({ description: "Available stock count" })
  @IsInt()
  stock_count: number;

  @ApiProperty({ description: "Price of the medication" })
  @IsNumber()
  price: number;
}
