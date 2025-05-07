// services/patient.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient)
    private readonly patientModel: typeof Patient
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    return this.patientModel.create(createPatientDto);
  }

  async findAll() {
    return this.patientModel.findAll();
  }

  async findOne(id: number) {
    const patient = await this.patientModel.findByPk(id);
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async update(id: number, updateDto: UpdatePatientDto) {
    const patient = await this.findOne(id);
    return patient.update(updateDto);
  }

  async remove(id: number) {
    const patient = await this.findOne(id);
    await patient.destroy();
    return { message: `Patient #${id} deleted` };
  }
}
