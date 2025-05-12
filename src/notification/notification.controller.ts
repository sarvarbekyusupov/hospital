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
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from "@nestjs/swagger";
import { Roles } from "../common/decorators/role.decorator";
import { UserGuard } from "../common/guards/user.guard";

@ApiTags("Notifications")
@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Create a new notification" })
  @ApiBody({ type: CreateNotificationDto })
  @ApiResponse({
    status: 201,
    description: "Notification created successfully",
  })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all notifications" })
  @ApiResponse({ status: 200, description: "List of notifications" })
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a notification by ID" })
  @ApiParam({ name: "id", description: "Notification ID" })
  @ApiResponse({ status: 200, description: "Notification details" })
  findOne(@Param("id") id: string) {
    return this.notificationService.findOne(+id);
  }

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update a notification by ID" })
  @ApiParam({ name: "id", description: "Notification ID" })
  @ApiBody({ type: UpdateNotificationDto })
  @ApiResponse({
    status: 200,
    description: "Notification updated successfully",
  })
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  // @UseGuards(UserGuard)
  // @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete a notification by ID" })
  @ApiParam({ name: "id", description: "Notification ID" })
  @ApiResponse({
    status: 200,
    description: "Notification deleted successfully",
  })
  remove(@Param("id") id: string) {
    return this.notificationService.remove(+id);
  }
}
