// services/prescription-item.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PrescriptionItem } from "./models/prescription_item.model";
import { CreatePrescriptionItemDto } from "./dto/create-prescription_item.dto";
import { UpdatePrescriptionItemDto } from "./dto/update-prescription_item.dto";

@Injectable()
export class PrescriptionItemService {
  constructor(
    @InjectModel(PrescriptionItem)
    private readonly prescriptionItemModel: typeof PrescriptionItem
  ) {}

  async create(dto: CreatePrescriptionItemDto) {
    return this.prescriptionItemModel.create(dto);
  }

  async findAll() {
    return this.prescriptionItemModel.findAll();
  }

  async findOne(id: number) {
    const item = await this.prescriptionItemModel.findByPk(id);
    if (!item)
      throw new NotFoundException(`PrescriptionItem with ID ${id} not found`);
    return item;
  }

  async update(id: number, dto: UpdatePrescriptionItemDto) {
    const item = await this.findOne(id);
    return item.update(dto);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await item.destroy();
    return { message: `PrescriptionItem #${id} deleted` };
  }
}
