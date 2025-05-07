export class CreatePatientDto {
  full_name: string;
  birth_date: Date;
  gender: string;
  phone: string;
  email: string;
  address: string;
  insurance_provider: string;
  emergency_contact: string;
  refresh_token: string;
  is_active: boolean;
  hashed_password: string;
}
