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
import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { Roles } from "../common/decorators/role.decorator";
import { UserGuard } from "../common/guards/user.guard";

@ApiTags("Appointments")
@Controller("appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Create a new appointment" })
  @ApiBody({ type: CreateAppointmentDto })
  @ApiResponse({ status: 201, description: "Appointment created successfully" })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all appointments" })
  @ApiResponse({ status: 200, description: "List of all appointments" })
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a specific appointment by ID" })
  @ApiParam({ name: "id", description: "Appointment ID" })
  @ApiResponse({ status: 200, description: "Appointment details" })
  findOne(@Param("id") id: string) {
    return this.appointmentService.findOne(+id);
  }

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update an appointment by ID" })
  @ApiParam({ name: "id", description: "Appointment ID" })
  @ApiBody({ type: UpdateAppointmentDto })
  @ApiResponse({ status: 200, description: "Appointment updated successfully" })
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete an appointment by ID" })
  @ApiParam({ name: "id", description: "Appointment ID" })
  @ApiResponse({ status: 200, description: "Appointment deleted successfully" })
  remove(@Param("id") id: string) {
    return this.appointmentService.remove(+id);
  }
}
