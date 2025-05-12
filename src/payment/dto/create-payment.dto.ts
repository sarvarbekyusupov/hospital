import { IsNumber, IsString, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({ description: "ID of the patient making the payment" })
  @IsNumber()
  patient_id: number;

  @ApiProperty({ description: "ID of the related appointment" })
  @IsNumber()
  appointment_id: number;

  @ApiProperty({ description: "Payment amount" })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: "Payment method (e.g., cash, card, online)" })
  @IsString()
  method: string;

  @ApiProperty({ description: "Payment status (e.g., paid, pending, failed)" })
  @IsString()
  status: string;

//   @ApiProperty({
//     description: "Timestamp of when the payment was made",
//     type: String,
//     format: "date-time",
//   })
//   @IsDateString()
//   paid_at: Date;
}
