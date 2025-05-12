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
  ParseIntPipe,
} from "@nestjs/common";
import { DoctorService } from "./doctor.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
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

@ApiTags("Doctors")
@Controller("doctor")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Create a new doctor" })
  @ApiBody({ type: CreateDoctorDto })
  @ApiResponse({ status: 201, description: "Doctor created successfully" })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Get all doctors" })
  @ApiResponse({ status: 200, description: "List of all doctors" })
  findAll() {
    return this.doctorService.findAll();
  }

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Get(":id")
  @ApiOperation({ summary: "Get a doctor by ID" })
  @ApiParam({ name: "id", description: "Doctor ID" })
  @ApiResponse({ status: 200, description: "Doctor details" })
  findOne(@Param("id") id: string) {
    return this.doctorService.findOne(+id);
  }

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update a doctor by ID" })
  @ApiParam({ name: "id", description: "Doctor ID" })
  @ApiBody({ type: UpdateDoctorDto })
  @ApiResponse({ status: 200, description: "Doctor updated successfully" })
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete a doctor by ID" })
  @ApiParam({ name: "id", description: "Doctor ID" })
  @ApiResponse({ status: 200, description: "Doctor deleted successfully" })
  remove(@Param("id") id: string) {
    return this.doctorService.remove(+id);
  }

  @Get("/activate/:link")
  @ApiOperation({ summary: "Activate a patient account via email link" })
  @ApiParam({ name: "link", description: "Activation link sent via email" })
  @ApiResponse({ status: 200, description: "Patient activated successfully" })
  async activateUser(@Param("link") link: string) {
    return this.doctorService.activateUser(link);
  }

  @Post("/refresh-token")
  @HttpCode(200)
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    return this.doctorService.refreshTokens(req, res);
  }

  @Get(":doctorId/active-appointments")
  async checkActiveAppointments(
    @Param("doctorId", ParseIntPipe) doctorId: number
  ): Promise<{
    hasActiveAppointments: boolean;
    message: string;
    appointments?: any[];
  }> {
    return this.doctorService.hasActiveAppointments(doctorId);
  }
}
