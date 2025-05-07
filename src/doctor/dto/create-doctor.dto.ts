export class CreateDoctorDto {
  full_name: string;
  specialization: string;
  phone: string;
  email: string;
  department_id: number;
  room_number: string;
  hashed_password: string;
  is_active: boolean;
}
