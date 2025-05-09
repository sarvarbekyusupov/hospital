export class SignInDto {
  email: string;
  password: string;
  role: "patient" | "doctor" | "admin" | "staff" | "creatorAdmin";
}
