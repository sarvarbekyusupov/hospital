import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { DepartmentService } from "./departments.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { UserGuard } from "../common/guards/user.guard";
import { Roles } from "../common/decorators/role.decorator";

@ApiTags("Departments")
@Controller("departments")
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentService) {}

  @UseGuards(UserGuard)
  @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Create a new department" })
  @ApiBody({ type: CreateDepartmentDto })
  @ApiResponse({ status: 201, description: "Department created successfully" })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all departments" })
  @ApiResponse({ status: 200, description: "List of departments" })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a specific department by ID" })
  @ApiParam({ name: "id", description: "Department ID" })
  @ApiResponse({ status: 200, description: "Department details" })
  findOne(@Param("id") id: string) {
    return this.departmentsService.findOne(+id);
  }

  @UseGuards(UserGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update a department by ID" })
  @ApiParam({ name: "id", description: "Department ID" })
  @ApiBody({ type: UpdateDepartmentDto })
  @ApiResponse({ status: 200, description: "Department updated successfully" })
  update(
    @Param("id") id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @UseGuards(UserGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete a department by ID" })
  @ApiParam({ name: "id", description: "Department ID" })
  @ApiResponse({ status: 200, description: "Department deleted successfully" })
  remove(@Param("id") id: string) {
    return this.departmentsService.remove(+id);
  }
}
