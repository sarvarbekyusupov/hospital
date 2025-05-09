import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtTokenService } from "../../auth/JwtService";
// import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RtGuard implements CanActivate {
  constructor(private jwtService: JwtTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const refreshToken = request.cookies?.refresh_token; // <-- Get it from cookies
    if (!refreshToken) {
      return false;
    }

    try {
      const decoded = await this.jwtService.verifyRefreshToken(refreshToken)

      request.user = { ...decoded, refresh_token: refreshToken }; // <-- Inject into request
      return refreshToken;
    } catch (err) {
      return false;
    }
  }
}
