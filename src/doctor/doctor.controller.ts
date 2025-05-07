import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@ApiTags("Doctors")
@Controller("doctor")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: "Create a new doctor" })
  @ApiBody({ type: CreateDoctorDto })
  @ApiResponse({ status: 201, description: "Doctor created successfully" })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all doctors" })
  @ApiResponse({ status: 200, description: "List of all doctors" })
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a doctor by ID" })
  @ApiParam({ name: "id", description: "Doctor ID" })
  @ApiResponse({ status: 200, description: "Doctor details" })
  findOne(@Param("id") id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a doctor by ID" })
  @ApiParam({ name: "id", description: "Doctor ID" })
  @ApiBody({ type: UpdateDoctorDto })
  @ApiResponse({ status: 200, description: "Doctor updated successfully" })
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a doctor by ID" })
  @ApiParam({ name: "id", description: "Doctor ID" })
  @ApiResponse({ status: 200, description: "Doctor deleted successfully" })
  remove(@Param("id") id: string) {
    return this.doctorService.remove(+id);
  }
}
