export class CreateNotificationDto {
  user_id: number;
  user_type: string;
  message: string;
  status: string;
  sent_at: Date;
}
