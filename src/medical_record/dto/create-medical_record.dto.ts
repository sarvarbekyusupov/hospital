export class CreateMedicalRecordDto {
  patient_id: number;
  doctor_id: number;
  diagnosis: string;
  treatment: string;
  created_at: Date;
}
