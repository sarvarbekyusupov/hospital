import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { SignInDto } from "./dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { PatientService } from "../patient/patient.service";
import { DoctorService } from "../doctor/doctor.service";
import { AdminService } from "../admin/admin.service";
import { StaffService } from "../staff/staff.service";
import { JwtTokenService } from "./JwtService";

@Injectable()
export class AuthService {
  constructor(
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
    private readonly adminService: AdminService,
    private readonly staffService: StaffService,
    private readonly jwtService: JwtTokenService
  ) {}

  async signIn(signInDto: SignInDto, res: Response) {
    const { email, password, role } = signInDto;

    let user;
    switch (role) {
      case "patient":
        user = await this.patientService.findByEmail(email);
        break;
      case "doctor":
        user = await this.doctorService.findByEmail(email);
        break;
      case "admin":
        user = await this.adminService.findByEmail(email);
        break;
      case "staff":
        user = await this.staffService.findByEmail(email);
        break;
      default:
        throw new BadRequestException("Invalid role");
    }

    console.log(user)

    if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
      throw new BadRequestException("Email or password incorrect");
    }

    if (!user.is_active) {
      throw new ForbiddenException("Please confirm your email first");
    }

    const payload = { id: user.id, role, is_active: user.is_active, email:user.email };
 
    const { refreshToken , accessToken} = this.jwtService.generateTokens(payload);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();

    return { message: "User signed in", accessToken };
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verifyRefreshToken(refreshToken) 

    const { id, role } = userData;

    let user;
    switch (role) {
      case "patient":
        user = await this.patientService.findOne(id);
        break;
      case "doctor":
        user = await this.doctorService.findOne(id);
        break;
      case "admin":
        user = await this.adminService.findOne(id);
        break;
      case "staff":
        user = await this.staffService.findOne(id);
        break;
      default:
        throw new ForbiddenException("Invalid role");
    }

    if (!user) throw new ForbiddenException("User not found");

    user.hashed_ref_token = null;
    await user.save();

    res.clearCookie("refresh_token");
    return { message: "User signed out" };
  }
}
