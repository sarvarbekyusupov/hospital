// services/staff.service.ts
import { BadGatewayException, BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { Request, Response } from "express";
import { JwtTokenService } from "../auth/JwtService";
import * as bcrypt from "bcrypt";


@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff)
    private readonly staffModel: typeof Staff,
    private readonly myjwtService: JwtTokenService,
  ) {}

  async create(dto: CreateStaffDto) {
    const { password, confirm_password } = dto;
        if (password !== confirm_password) {
          throw new BadGatewayException("Parollar mos emas");
        }
    
        const hashed_password = await bcrypt.hash(password, 7);
    
        const newStaff = await this.staffModel.create({
          ...dto,
          hashed_password,
        });
    
        return newStaff;
  }

  async findAll() {
    return this.staffModel.findAll();
  }

  async findOne(id: number) {
    const staff = await this.staffModel.findByPk(id);
    if (!staff)
      throw new NotFoundException(`Staff member with ID ${id} not found`);
    return staff;
  }

  async update(id: number, dto: UpdateStaffDto) {
    const staff = await this.findOne(id);
    return staff.update(dto);
  }

  async remove(id: number) {
    const staff = await this.findOne(id);
    await staff.destroy();
    return { message: `Staff member #${id} deleted` };
  }

  async findByEmail(email: string) {
    const user = await this.staffModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Staff with Email: ${email} not found`);
    }
    return user;
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const updatedUser = await this.staffModel.update(
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
    const user = await this.staffModel.findOne({
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
