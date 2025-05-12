import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Prescription } from "./models/prescription.model";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectModel(Prescription)
    private prescriptionModel: typeof Prescription
  ) {}

  async create(createDto: CreatePrescriptionDto) {
    return this.prescriptionModel.create(createDto);
  }

  async findAll() {
    return this.prescriptionModel.findAll();
  }

  async findOne(id: number) {
    const prescription = await this.prescriptionModel.findByPk(id);
    if (!prescription) {
      throw new NotFoundException(`Prescription #${id} not found`);
    }
    return prescription;
  }

  async update(id: number, updateDto: UpdatePrescriptionDto) {
    const prescription = await this.findOne(id);
    return prescription.update(updateDto);
  }

  async remove(id: number) {
    const prescription = await this.findOne(id);
    await prescription.destroy();
    return { message: `Prescription #${id} deleted successfully` };
  }
}
