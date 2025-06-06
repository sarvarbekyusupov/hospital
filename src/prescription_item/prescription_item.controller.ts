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
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PrescriptionItemService } from "./prescription_item.service";
import { CreatePrescriptionItemDto } from "./dto/create-prescription_item.dto";
import { UpdatePrescriptionItemDto } from "./dto/update-prescription_item.dto";
import { UserGuard } from "../common/guards/user.guard";
import { Roles } from "../common/decorators/role.decorator";

@ApiTags("Prescription Items")
@Controller("prescription-item")
export class PrescriptionItemController {
  constructor(
    private readonly prescriptionItemService: PrescriptionItemService
  ) {}

  // @UseGuards(UserGuard)
  // @Roles("doctor", "admin")
  @Post()
  @ApiOperation({ summary: "Create a prescription item" })
  @ApiResponse({
    status: 201,
    description: "Prescription item created successfully.",
  })
  create(@Body() createPrescriptionItemDto: CreatePrescriptionItemDto) {
    return this.prescriptionItemService.create(createPrescriptionItemDto);
  }

  // @UseGuards(UserGuard)
  // @Roles("doctor", "admin")
  @Get()
  @ApiOperation({ summary: "Get all prescription items" })
  @ApiResponse({
    status: 200,
    description: "List of prescription items returned successfully.",
  })
  findAll() {
    return this.prescriptionItemService.findAll();
  }

  // @UseGuards(UserGuard)
  // @Roles("doctor", "admin")
  @Get(":id")
  @ApiOperation({ summary: "Get a specific prescription item by ID" })
  @ApiResponse({
    status: 200,
    description: "Prescription item returned successfully.",
  })
  findOne(@Param("id") id: string) {
    return this.prescriptionItemService.findOne(+id);
  }

  // @UseGuards(UserGuard)
  // @Roles("doctor", "admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update a prescription item by ID" })
  @ApiResponse({
    status: 200,
    description: "Prescription item updated successfully.",
  })
  update(
    @Param("id") id: string,
    @Body() updatePrescriptionItemDto: UpdatePrescriptionItemDto
  ) {
    return this.prescriptionItemService.update(+id, updatePrescriptionItemDto);
  }

  // @UseGuards(UserGuard)
  // @Roles("doctor", "admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete a prescription item by ID" })
  @ApiResponse({
    status: 200,
    description: "Prescription item deleted successfully.",
  })
  remove(@Param("id") id: string) {
    return this.prescriptionItemService.remove(+id);
  }
}
