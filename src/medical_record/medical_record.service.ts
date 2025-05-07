// services/medical-record.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMedicalRecordDto } from "./dto/create-medical_record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical_record.dto";
import { InjectModel } from "@nestjs/sequelize";
import { MedicalRecord } from "./models/medical_record.model";

@Injectable()
export class MedicalRecordService {
  constructor(
    @InjectModel(MedicalRecord)
    private readonly medicalRecordModel: typeof MedicalRecord
  ) {}

  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordModel.create(createMedicalRecordDto);
  }

  async findAll() {
    return this.medicalRecordModel.findAll();
  }

  async findOne(id: number) {
    const record = await this.medicalRecordModel.findByPk(id);
    if (!record) {
      throw new NotFoundException(`Medical record with ID ${id} not found`);
    }
    return record;
  }

  async update(id: number, updateDto: UpdateMedicalRecordDto) {
    const record = await this.findOne(id);
    return record.update(updateDto);
  }

  async remove(id: number) {
    const record = await this.findOne(id);
    await record.destroy();
    return { message: `Medical record #${id} deleted` };
  }
}
