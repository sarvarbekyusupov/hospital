import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { JwtTokenService } from "./JwtService";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { PatientModule } from "../patient/patient.module";
import { DoctorModule } from "../doctor/doctor.module";
import { AdminModule } from "../admin/admin.module";
import { StaffModule } from "../staff/staff.module";

@Module({
  imports: [
    JwtModule.register({ global: true }),
    forwardRef(() => PatientModule), // Handles circular dep with PatientService
    forwardRef(() => AdminModule),
    forwardRef(() => DoctorModule),
    forwardRef(() => StaffModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtTokenService],
  exports: [AuthService, JwtTokenService], // Optional: if other modules need to use AuthService
})
export class AuthModule {}
