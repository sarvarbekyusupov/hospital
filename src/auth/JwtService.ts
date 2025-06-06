// src/common/services/jwt.service.ts
import { ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as process from "process";

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokens(payload: {
    id: number;
    email: string;
    role: string;
    is_active: boolean;
  }) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    // payload => id, is_active, role, email

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.ACCESS_TOKEN_KEY,
    });
  }

  async verifyRefreshToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (err) {
      throw new ForbiddenException("Invalid or expired refresh token");
    }
  }

  // async verifyRefreshToken(token: string) {
  //   return this.jwtService.verifyAsync(token, {
  //     secret: process.env.REFRESH_TOKEN_KEY,
  //   });
  // }
}
