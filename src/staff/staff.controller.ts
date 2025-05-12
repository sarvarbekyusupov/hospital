import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { StaffService } from "./staff.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { Request, Response } from "express";
import { UserGuard } from "../common/guards/user.guard";
import { Roles } from "../common/decorators/role.decorator";

@ApiTags("Staff")
@Controller("staff")
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Create a new staff member" })
  @ApiResponse({
    status: 201,
    description: "Staff member created successfully.",
  })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Retrieve all staff members" })
  findAll() {
    return this.staffService.findAll();
  }

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Get(":id")
  @ApiOperation({ summary: "Get a single staff member by ID" })
  findOne(@Param("id") id: string) {
    return this.staffService.findOne(+id);
  }

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update a staff member" })
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete a staff member" })
  remove(@Param("id") id: string) {
    return this.staffService.remove(+id);
  }

  @Get("/activate/:link")
  @ApiOperation({ summary: "Activate a patient account via email link" })
  @ApiParam({ name: "link", description: "Activation link sent via email" })
  @ApiResponse({ status: 200, description: "Patient activated successfully" })
  async activateUser(@Param("link") link: string) {
    return this.staffService.activateUser(link);
  }

  @Post("/refresh-token")
  @HttpCode(200)
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    return this.staffService.refreshTokens(req, res);
  }
}
