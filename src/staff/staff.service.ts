// services/staff.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";

@Injectable()
export class StaffService {
  constructor(
    @InjectModel(Staff)
    private readonly staffModel: typeof Staff
  ) {}

  async create(dto: CreateStaffDto) {
    return this.staffModel.create(dto);
  }

  async findAll() {
    return this.staffModel.findAll();
  }

  async findOne(id: number) {
    const staff = await this.staffModel.findByPk(id);
    if (!staff)
      throw new NotFoundException(`Staff member with ID ${id} not found`);
    return staff;
  }

  async update(id: number, dto: UpdateStaffDto) {
    const staff = await this.findOne(id);
    return staff.update(dto);
  }

  async remove(id: number) {
    const staff = await this.findOne(id);
    await staff.destroy();
    return { message: `Staff member #${id} deleted` };
  }

  async findByEmail(email: string) {
    const user = await this.staffModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Staff with Email: ${email} not found`);
    }
    return user;
  }
}
