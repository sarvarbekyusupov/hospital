// services/lab-test.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateLabTestDto } from "./dto/create-lab_test.dto";
import { UpdateLabTestDto } from "./dto/update-lab_test.dto";
import { InjectModel } from "@nestjs/sequelize";
import { LabTest } from "./models/lab_test.model";

@Injectable()
export class LabTestService {
  constructor(
    @InjectModel(LabTest)
    private readonly labTestModel: typeof LabTest
  ) {}

  async create(createLabTestDto: CreateLabTestDto) {
    return this.labTestModel.create(createLabTestDto);
  }

  async findAll() {
    return this.labTestModel.findAll();
  }

  async findOne(id: number) {
    const labTest = await this.labTestModel.findByPk(id);
    if (!labTest) {
      throw new NotFoundException(`Lab test with ID ${id} not found`);
    }
    return labTest;
  }

  async update(id: number, updateDto: UpdateLabTestDto) {
    const labTest = await this.findOne(id);
    return labTest.update(updateDto);
  }

  async remove(id: number) {
    const labTest = await this.findOne(id);
    await labTest.destroy();
    return { message: `Lab test #${id} deleted` };
  }
}
