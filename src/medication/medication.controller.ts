import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MedicationService } from "./medication.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("Medications")
@Controller("medication")
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  @ApiOperation({ summary: "Create a new medication" })
  @ApiBody({ type: CreateMedicationDto })
  @ApiResponse({ status: 201, description: "Medication created successfully" })
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationService.create(createMedicationDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all medications" })
  @ApiResponse({ status: 200, description: "List of medications" })
  findAll() {
    return this.medicationService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a medication by ID" })
  @ApiParam({ name: "id", description: "Medication ID" })
  @ApiResponse({ status: 200, description: "Medication details" })
  findOne(@Param("id") id: string) {
    return this.medicationService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a medication by ID" })
  @ApiParam({ name: "id", description: "Medication ID" })
  @ApiBody({ type: UpdateMedicationDto })
  @ApiResponse({ status: 200, description: "Medication updated successfully" })
  update(
    @Param("id") id: string,
    @Body() updateMedicationDto: UpdateMedicationDto
  ) {
    return this.medicationService.update(+id, updateMedicationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a medication by ID" })
  @ApiParam({ name: "id", description: "Medication ID" })
  @ApiResponse({ status: 200, description: "Medication deleted successfully" })
  remove(@Param("id") id: string) {
    return this.medicationService.remove(+id);
  }
}
