// services/doctor.service.ts
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { Request, Response } from "express";
import { JwtTokenService } from "../auth/JwtService";
import * as bcrypt from "bcrypt";


@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor)
    private readonly doctorModel: typeof Doctor,
    private readonly myjwtService: JwtTokenService
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
const { password, confirm_password } = createDoctorDto;
    if (password !== confirm_password) {
      throw new BadGatewayException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newDoctor = await this.doctorModel.create({
      ...createDoctorDto,
      hashed_password,
    });

    return newDoctor;  }

  async findAll() {
    return this.doctorModel.findAll();
  }

  async findOne(id: number) {
    const doctor = await this.doctorModel.findByPk(id);
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async update(id: number, updateDto: UpdateDoctorDto) {
    const doctor = await this.findOne(id);
    return doctor.update(updateDto);
  }

  async remove(id: number) {
    const doctor = await this.findOne(id);
    await doctor.destroy();
    return { message: `Doctor #${id} deleted` };
  }

  async findByEmail(email: string) {
    const user = await this.doctorModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Doctor with Email: ${email} not found`);
    }
    return user;
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const updatedUser = await this.doctorModel.update(
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

  async refreshTokens(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];

    if (!refresh_token)
      throw new BadRequestException("Refresh Token mavjud emas!");

    const payload = await this.myjwtService.verifyRefreshToken(refresh_token);

    const id = payload.id;
    const user = await this.doctorModel.findOne({
      where: { id },
    });

    if (!user || !user.refresh_token) {
      throw new UnauthorizedException("admin topilmadi yoki login qilinmagan");
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
