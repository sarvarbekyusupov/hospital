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
import { RtGuard } from "../common/guards/rt.guard";
import { GetCurrentUser } from "../common/decorators/get-current-user.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

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

  @Get()
  @ApiOperation({ summary: "Get all patients" })
  @ApiResponse({ status: 200, description: "List of all patients" })
  findAll() {
    return this.patientService.findAll();
  }

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

  // @Post("/refresh-token")
  // @UseGuards(RtGuard)
  // @ApiOperation({
  //   summary: "Refresh authentication tokens using refresh token",
  // })
  // @ApiResponse({ status: 200, description: "Tokens refreshed successfully" })
  // refreshTokens(
  //   @GetCurrentUser("sub") id: number,
  //   @GetCurrentUser("refresh_token") refresh_token: string,
  //   @Res({ passthrough: true }) res: ExpressResponse
  // ) {
  //   return this.patientService.refreshTokens(id, refresh_token, res);
  // }

  // @Post("/refresh-token")
  // async refreshTokens(
  //   @Req() req: Request,
  //   @Res({ passthrough: true }) res: Response
  // ) {
  //   const refresh_token = req.cookies?.refresh_token;

  //   if (!refresh_token) {
  //     throw new ForbiddenException("Missing refresh token");
  //   }

  //   return this.patientService.refreshTokens(refresh_token, res);
  // }

  @Post('refresh-token')
  @HttpCode(200)
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    return this.patientService.refreshTokens(req, res);
  }
}
