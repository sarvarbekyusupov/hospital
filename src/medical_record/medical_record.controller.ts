import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MedicalRecordService } from "./medical_record.service";
import { CreateMedicalRecordDto } from "./dto/create-medical_record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical_record.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Medical Records")
@Controller("medical-record")
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post()
  @ApiOperation({ summary: "Create a new medical record" })
  @ApiBody({ type: CreateMedicalRecordDto })
  @ApiResponse({
    status: 201,
    description: "Medical record created successfully",
  })
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordService.create(createMedicalRecordDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all medical records" })
  @ApiResponse({ status: 200, description: "List of medical records" })
  findAll() {
    return this.medicalRecordService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a medical record by ID" })
  @ApiParam({ name: "id", description: "Medical record ID" })
  @ApiResponse({ status: 200, description: "Medical record details" })
  findOne(@Param("id") id: string) {
    return this.medicalRecordService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a medical record by ID" })
  @ApiParam({ name: "id", description: "Medical record ID" })
  @ApiBody({ type: UpdateMedicalRecordDto })
  @ApiResponse({
    status: 200,
    description: "Medical record updated successfully",
  })
  update(
    @Param("id") id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
  ) {
    return this.medicalRecordService.update(+id, updateMedicalRecordDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a medical record by ID" })
  @ApiParam({ name: "id", description: "Medical record ID" })
  @ApiResponse({
    status: 200,
    description: "Medical record deleted successfully",
  })
  remove(@Param("id") id: string) {
    return this.medicalRecordService.remove(+id);
  }
}
