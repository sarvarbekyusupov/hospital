// services/medication.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Medication } from "./models/medication.model";

@Injectable()
export class MedicationService {
  constructor(
    @InjectModel(Medication)
    private readonly medicationModel: typeof Medication
  ) {}

  async create(createMedicationDto: CreateMedicationDto) {
    return this.medicationModel.create(createMedicationDto);
  }

  async findAll() {
    return this.medicationModel.findAll();
  }

  async findOne(id: number) {
    const medication = await this.medicationModel.findByPk(id);
    if (!medication) {
      throw new NotFoundException(`Medication with ID ${id} not found`);
    }
    return medication;
  }

  async update(id: number, updateDto: UpdateMedicationDto) {
    const medication = await this.findOne(id);
    return medication.update(updateDto);
  }

  async remove(id: number) {
    const medication = await this.findOne(id);
    await medication.destroy();
    return { message: `Medication #${id} deleted` };
  }
}
