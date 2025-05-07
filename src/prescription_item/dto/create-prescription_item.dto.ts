import { ApiProperty } from "@nestjs/swagger";

export class CreatePrescriptionItemDto {
  @ApiProperty({
    example: 1,
    description: "ID of the prescription this item belongs to",
  })
  prescription_id: number;

  @ApiProperty({ example: 42, description: "ID of the prescribed medication" })
  medication_id: number;

  @ApiProperty({ example: "500mg", description: "Dosage of the medication" })
  dosage: string;

  @ApiProperty({
    example: "Twice a day",
    description: "How frequently the medication should be taken",
  })
  frequency: string;

  @ApiProperty({
    example: "7 days",
    description: "Duration for which the medication should be taken",
  })
  duration: string;
}
