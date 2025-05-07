export class CreateLabTestDto {
  patient_id: number;
  doctor_id: number;
  test_type: string;
  status: string;
  result: string;
  date: Date;
}
