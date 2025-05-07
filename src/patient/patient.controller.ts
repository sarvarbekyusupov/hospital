import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
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
  @ApiResponse({ status: 200, description: "Patient data" })
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
}
