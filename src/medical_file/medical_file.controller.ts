import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MedicalFileService } from "./medical_file.service";
import { CreateMedicalFileDto } from "./dto/create-medical_file.dto";
import { UpdateMedicalFileDto } from "./dto/update-medical_file.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Medical Files")
@Controller("medical-file")
export class MedicalFileController {
  constructor(private readonly medicalFileService: MedicalFileService) {}

  @Post()
  @ApiOperation({ summary: "Create a new medical file" })
  @ApiBody({ type: CreateMedicalFileDto })
  @ApiResponse({
    status: 201,
    description: "Medical file created successfully",
  })
  create(@Body() createMedicalFileDto: CreateMedicalFileDto) {
    return this.medicalFileService.create(createMedicalFileDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all medical files" })
  @ApiResponse({ status: 200, description: "List of all medical files" })
  findAll() {
    return this.medicalFileService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a medical file by ID" })
  @ApiParam({ name: "id", description: "Medical file ID" })
  @ApiResponse({ status: 200, description: "Medical file details" })
  findOne(@Param("id") id: string) {
    return this.medicalFileService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a medical file by ID" })
  @ApiParam({ name: "id", description: "Medical file ID" })
  @ApiBody({ type: UpdateMedicalFileDto })
  @ApiResponse({
    status: 200,
    description: "Medical file updated successfully",
  })
  update(
    @Param("id") id: string,
    @Body() updateMedicalFileDto: UpdateMedicalFileDto
  ) {
    return this.medicalFileService.update(+id, updateMedicalFileDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a medical file by ID" })
  @ApiParam({ name: "id", description: "Medical file ID" })
  @ApiResponse({
    status: 200,
    description: "Medical file deleted successfully",
  })
  remove(@Param("id") id: string) {
    return this.medicalFileService.remove(+id);
  }
}
