// services/payment.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment)
    private readonly paymentModel: typeof Payment
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  async findAll() {
    return this.paymentModel.findAll();
  }

  async findOne(id: number) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async update(id: number, updateDto: UpdatePaymentDto) {
    const payment = await this.findOne(id);
    return payment.update(updateDto);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    await payment.destroy();
    return { message: `Payment #${id} deleted` };
  }
}
