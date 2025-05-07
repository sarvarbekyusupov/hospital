import { Injectable } from '@nestjs/common';
import { CreateMedicalFileDto } from './dto/create-medical_file.dto';
import { UpdateMedicalFileDto } from './dto/update-medical_file.dto';

@Injectable()
export class MedicalFileService {
  create(createMedicalFileDto: CreateMedicalFileDto) {
    return 'This action adds a new medicalFile';
  }

  findAll() {
    return `This action returns all medicalFile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalFile`;
  }

  update(id: number, updateMedicalFileDto: UpdateMedicalFileDto) {
    return `This action updates a #${id} medicalFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalFile`;
  }
}
