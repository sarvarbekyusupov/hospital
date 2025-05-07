import { Injectable } from '@nestjs/common';
import { CreateLabTestDto } from './dto/create-lab_test.dto';
import { UpdateLabTestDto } from './dto/update-lab_test.dto';

@Injectable()
export class LabTestService {
  create(createLabTestDto: CreateLabTestDto) {
    return 'This action adds a new labTest';
  }

  findAll() {
    return `This action returns all labTest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} labTest`;
  }

  update(id: number, updateLabTestDto: UpdateLabTestDto) {
    return `This action updates a #${id} labTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} labTest`;
  }
}
