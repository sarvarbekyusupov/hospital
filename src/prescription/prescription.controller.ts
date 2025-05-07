import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PrescriptionService } from "./prescription.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Prescription")
@Controller("prescription")
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  @ApiOperation({ summary: "Create a new prescription" })
  @ApiResponse({
    status: 201,
    description: "Prescription created successfully",
  })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all prescriptions" })
  @ApiResponse({ status: 200, description: "List of prescriptions" })
  findAll() {
    return this.prescriptionService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a prescription by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Prescription found" })
  @ApiResponse({ status: 404, description: "Prescription not found" })
  findOne(@Param("id") id: string) {
    return this.prescriptionService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a prescription by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Prescription updated successfully",
  })
  update(
    @Param("id") id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto
  ) {
    return this.prescriptionService.update(+id, updatePrescriptionDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a prescription by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({
    status: 200,
    description: "Prescription deleted successfully",
  })
  remove(@Param("id") id: string) {
    return this.prescriptionService.remove(+id);
  }
}
