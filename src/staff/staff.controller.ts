import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";

@ApiTags("Staff")
@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: "Create a new staff member" })
  @ApiResponse({
    status: 201,
    description: "Staff member created successfully.",
  })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all staff members" })
  findAll() {
    return this.staffService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a single staff member by ID" })
  findOne(@Param("id") id: string) {
    return this.staffService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a staff member" })
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a staff member" })
  remove(@Param("id") id: string) {
    return this.staffService.remove(+id);
  }
}
