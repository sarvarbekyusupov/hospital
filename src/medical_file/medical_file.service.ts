// services/medical-file.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMedicalFileDto } from "./dto/create-medical_file.dto";
import { UpdateMedicalFileDto } from "./dto/update-medical_file.dto";
import { InjectModel } from "@nestjs/sequelize";
import { MedicalFile } from "./models/medical_file.model";

@Injectable()
export class MedicalFileService {
  constructor(
    @InjectModel(MedicalFile)
    private readonly medicalFileModel: typeof MedicalFile
  ) {}

  async create(createMedicalFileDto: CreateMedicalFileDto) {
    return this.medicalFileModel.create(createMedicalFileDto);
  }

  async findAll() {
    return this.medicalFileModel.findAll();
  }

  async findOne(id: number) {
    const medicalFile = await this.medicalFileModel.findByPk(id);
    if (!medicalFile) {
      throw new NotFoundException(`Medical file with ID ${id} not found`);
    }
    return medicalFile;
  }

  async update(id: number, updateDto: UpdateMedicalFileDto) {
    const medicalFile = await this.findOne(id);
    return medicalFile.update(updateDto);
  }

  async remove(id: number) {
    const medicalFile = await this.findOne(id);
    await medicalFile.destroy();
    return { message: `Medical file #${id} deleted` };
  }
}
