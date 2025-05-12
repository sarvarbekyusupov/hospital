import { IsInt, IsString, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDto {
  @ApiProperty({ description: "ID of the user receiving the notification" })
  @IsInt()
  user_id: number;

  @ApiProperty({
    description: "Type of the user (e.g., admin, patient, doctor)",
  })
  @IsString()
  user_type: string;

  @ApiProperty({ description: "Notification message content" })
  @IsString()
  message: string;

  @ApiProperty({
    description: "Status of the notification (e.g., read, unread)",
  })
  @IsString()
  status: string;

  @ApiProperty({
    description: "Timestamp when the notification was sent",
    type: String,
    format: "date-time",
  })
  // @IsDate()
  sent_at: Date;
}
