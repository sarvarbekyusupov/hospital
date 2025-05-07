export class CreateAppointmentDto {
  patient_id: number;
  doctor_id: number;
  appointment_time: Date;
  status: string;
  notes: string;
}
