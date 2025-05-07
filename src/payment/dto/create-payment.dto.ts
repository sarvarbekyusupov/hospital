export class CreatePaymentDto {
  patient_id: number;
  appointment_id: number;
  amount: number;
  method: string;
  status: string;
  paid_at: Date;
}
