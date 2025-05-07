// services/department.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Department } from "./models/department.model";

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department)
    private readonly departmentModel: typeof Department
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentModel.create(createDepartmentDto);
  }

  async findAll() {
    return this.departmentModel.findAll();
  }

  async findOne(id: number) {
    const department = await this.departmentModel.findByPk(id);
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(id: number, updateDto: UpdateDepartmentDto) {
    const department = await this.findOne(id);
    return department.update(updateDto);
  }

  async remove(id: number) {
    const department = await this.findOne(id);
    await department.destroy();
    return { message: `Department #${id} deleted` };
  }
}
