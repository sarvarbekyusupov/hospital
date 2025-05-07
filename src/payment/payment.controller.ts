import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";

@ApiTags("Payments")
@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: "Create a new payment" })
  @ApiResponse({ status: 201, description: "Payment successfully created." })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all payments" })
  @ApiResponse({ status: 200, description: "List of all payments" })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get payment by ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Payment found" })
  @ApiResponse({ status: 404, description: "Payment not found" })
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a payment" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Payment updated successfully" })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a payment" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Payment deleted successfully" })
  remove(@Param("id") id: string) {
    return this.paymentService.remove(+id);
  }
}
