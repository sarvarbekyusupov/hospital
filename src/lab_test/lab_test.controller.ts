import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LabTestService } from "./lab_test.service";
import { CreateLabTestDto } from "./dto/create-lab_test.dto";
import { UpdateLabTestDto } from "./dto/update-lab_test.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("Lab Tests")
@Controller("lab-test")
export class LabTestController {
  constructor(private readonly labTestService: LabTestService) {}

  @Post()
  @ApiOperation({ summary: "Create a new lab test" })
  @ApiBody({ type: CreateLabTestDto })
  @ApiResponse({ status: 201, description: "Lab test created successfully" })
  create(@Body() createLabTestDto: CreateLabTestDto) {
    return this.labTestService.create(createLabTestDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all lab tests" })
  @ApiResponse({ status: 200, description: "List of lab tests" })
  findAll() {
    return this.labTestService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a specific lab test by ID" })
  @ApiParam({ name: "id", description: "Lab test ID" })
  @ApiResponse({ status: 200, description: "Lab test details" })
  findOne(@Param("id") id: string) {
    return this.labTestService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a lab test by ID" })
  @ApiParam({ name: "id", description: "Lab test ID" })
  @ApiBody({ type: UpdateLabTestDto })
  @ApiResponse({ status: 200, description: "Lab test updated successfully" })
  update(@Param("id") id: string, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestService.update(+id, updateLabTestDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a lab test by ID" })
  @ApiParam({ name: "id", description: "Lab test ID" })
  @ApiResponse({ status: 200, description: "Lab test deleted successfully" })
  remove(@Param("id") id: string) {
    return this.labTestService.remove(+id);
  }
}
