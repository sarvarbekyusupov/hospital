import {
  BadGatewayException,
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";

import * as bcrypt from "bcrypt";
import { Admin } from "./models/admin.model";
import { Request, Response } from "express";
import { JwtTokenService } from "../auth/JwtService";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    private readonly myjwtService: JwtTokenService,
    private readonly jwtService: JwtService
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadGatewayException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    return newAdmin;
  }

  async findAll() {
    const admins = await this.adminModel.findAll();
    return admins;
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`ID ${id} ga ega admin topilmadi`);
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`ID ${id} ga ega admin topilmadi`);
    }

    await admin.update(updateAdminDto);
    return admin;
  }

  async remove(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException(`ID ${id} ga ega admin topilmadi`);
    }

    await admin.destroy();
    return { message: `Admin ID ${id} o'chirildi` };
  }

  async findByEmail(email: string) {
    const user = await this.adminModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Admin with Email: ${email} not found`);
    }
    return user;
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }

    const updatedUser = await this.adminModel.update(
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
    console.log(refresh_token, "bu refresh token");

    if (!refresh_token)
      throw new BadRequestException("Refresh Token mavjud emas!");

    const payload = await this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    const id = payload.id
    const user = await this.adminModel.findOne({
      where: { id },
    });


    if (!user || !user.refresh_token) {
      throw new UnauthorizedException(
        "admin topilmadi yoki login qilinmagan"
      );
    }
    console.log(user);


    const isValid = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!isValid) throw new UnauthorizedException("Refresh Token noto'g'ri");

    const { accessToken, refreshToken } = await this.myjwtService.generateTokens(user);
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
