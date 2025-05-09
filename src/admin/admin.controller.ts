import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { Request, Response } from "express";
import { UserGuard } from "../common/guards/user.guard";
import { Roles } from "../common/decorators/role.decorator";

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(UserGuard)
  @Roles("superAdmin")
  @Post()
  @ApiOperation({ summary: "Create a new admin" })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 201, description: "Admin created successfully" })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(UserGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({ status: 200, description: "List of admins" })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(UserGuard)
  @Roles("superAdmin")
  @Get(":id")
  @ApiOperation({ summary: "Get a specific admin by ID" })
  @ApiParam({ name: "id", description: "Admin ID" })
  @ApiResponse({ status: 200, description: "Admin details" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(UserGuard)
  @Roles("superAdmin")
  @Patch(":id")
  @ApiOperation({ summary: "Update an admin by ID" })
  @ApiParam({ name: "id", description: "Admin ID" })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({ status: 200, description: "Admin updated successfully" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(UserGuard)
  @Roles("superAdmin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete an admin by ID" })
  @ApiParam({ name: "id", description: "Admin ID" })
  @ApiResponse({ status: 200, description: "Admin deleted successfully" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }

  @Get("/activate/:link")
  @ApiOperation({ summary: "Activate a patient account via email link" })
  @ApiParam({ name: "link", description: "Activation link sent via email" })
  @ApiResponse({ status: 200, description: "Patient activated successfully" })
  async activateUser(@Param("link") link: string) {
    return this.adminService.activateUser(link);
  }

  @Post("/refresh-token")
  @HttpCode(200)
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    return this.adminService.refreshTokens(req, res);
  }
}
