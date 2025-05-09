import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
  ForbiddenException,
  HttpCode,
} from "@nestjs/common";
import { Response as ExpressResponse } from "express";
import { Request, Response } from "express";


import { PatientService } from "./patient.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { Roles } from "../common/decorators/role.decorator";
import { UserGuard } from "../common/guards/user.guard";

@ApiTags("Patients")
@Controller("patient")
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiOperation({ summary: "Create a new patient" })
  @ApiBody({ type: CreatePatientDto })
  @ApiResponse({ status: 201, description: "Patient created successfully" })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @UseGuards(UserGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Get all patients" })
  @ApiResponse({ status: 200, description: "List of all patients" })
  findAll() {
    return this.patientService.findAll();
  }

  @UseGuards(UserGuard)
  @Roles("admin")
  @Get(":id")
  @ApiOperation({ summary: "Get a patient by ID" })
  @ApiParam({ name: "id", description: "Patient ID" })
  @ApiResponse({ status: 200, description: "Patient data retrieved" })
  findOne(@Param("id") id: string) {
    return this.patientService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a patient by ID" })
  @ApiParam({ name: "id", description: "Patient ID" })
  @ApiBody({ type: UpdatePatientDto })
  @ApiResponse({ status: 200, description: "Patient updated successfully" })
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(+id, updatePatientDto);
  }

  @UseGuards(UserGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete a patient by ID" })
  @ApiParam({ name: "id", description: "Patient ID" })
  @ApiResponse({ status: 200, description: "Patient deleted successfully" })
  remove(@Param("id") id: string) {
    return this.patientService.remove(+id);
  }

  @Get("/activate/:link")
  @ApiOperation({ summary: "Activate a patient account via email link" })
  @ApiParam({ name: "link", description: "Activation link sent via email" })
  @ApiResponse({ status: 200, description: "Patient activated successfully" })
  async activateUser(@Param("link") link: string) {
    return this.patientService.activateUser(link);
  }

  @Post("refresh-token")
  @HttpCode(200)
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    return this.patientService.refreshTokens(req, res);
  }
}
