// services/patient.service.ts
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import { JwtTokenService } from "../auth/JwtService";
import { Response as ExpressResponse } from "express";
import { Request, Response } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient)
    private readonly patientModel: typeof Patient,
    private readonly mailService: MailService,
    private readonly myjwtService: JwtTokenService,
    private readonly jwtService: JwtService
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { password, confirm_password } = createPatientDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newPateint = await this.patientModel.create({
      ...createPatientDto,
      hashed_password,
      role: "patient",
    });

    try {
      await this.mailService.sendMail(newPateint);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("emailga xat yuborishda xatolik");
    }

    return newPateint;
  }

  async findAll() {
    return this.patientModel.findAll();
  }

  async findOne(id: number) {
    const patient = await this.patientModel.findByPk(id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async findByEmail(email: string) {
    const patient = await this.patientModel.findOne({ where: { email } });
    if (!patient) {
      throw new NotFoundException(`Patient with Email: ${email} not found`);
    }
    return patient;
  }

  async update(id: number, updateDto: UpdatePatientDto) {
    const patient = await this.findOne(id);
    return patient.update(updateDto);
  }

  async remove(id: number) {
    const patient = await this.findOne(id);
    await patient.destroy();
    return { message: `Patient #${id} deleted` };
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const updatedUser = await this.patientModel.update(
      { is_active: true },
      {
        where: {
          activation_link: link,
          is_active: false,
        },
        returning: true, //effected
      }
    );

    if (!updatedUser[1][0]) {
      throw new BadRequestException("User already activated");
    }

    return {
      message: "User activated successfully",
      is_active: updatedUser[1][0].is_active,
    };
  }

  // async refreshTokens(id: number, token: string, res: ExpressResponse) {
  //   const patient = await this.patientModel.findOne({
  //     where: { refresh_token: token },
  //   });
  //   console.log("id", id);
  //   console.log("patient", patient);

  //   if (!patient || !patient.refresh_token) {
  //     throw new ForbiddenException("Access Denied");
  //   }

  //   const isMatch = await bcrypt.compare(token, patient.refresh_token);
  //   if (!isMatch) {
  //     throw new ForbiddenException("Invalid refresh token");
  //   }

  //   const payload = { id: patient.id, role: "patient" };
  //   const tokens = this.jwtService.generateTokens(payload);

  //   await patient.update({
  //     refresh_token: await bcrypt.hash(tokens.refreshToken, 7),
  //   });

  //   res.cookie("refresh_token", tokens.refreshToken, {
  //     httpOnly: true,
  //     maxAge: Number(process.env.COOKIE_TIME),
  //   });

  //   return { accessToken: tokens.accessToken };
  // }

  async refreshTokens(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token)
      throw new BadRequestException("Refresh Token mavjud emas!");

    const payload = await this.myjwtService.verifyRefreshToken(refresh_token);

    const user = await this.patientModel.findOne({
      where: { id: payload.id },
    });
    if (!user || !user.refresh_token) {
      throw new UnauthorizedException(
        "Patient topilmadi yoki login qilinmagan"
      );
    }

    const isValid = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!isValid) throw new UnauthorizedException("Refresh Token noto'g'ri");

    const { accessToken, refreshToken } =
      await this.myjwtService.generateTokens({
        id: user.id,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
      });

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    user.refresh_token = hashed_refresh_token;
    await user.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return res.status(200).json({
      success: true,
      token: accessToken,
    });
  }
}
