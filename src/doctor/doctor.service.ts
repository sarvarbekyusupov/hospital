// services/doctor.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor)
    private readonly doctorModel: typeof Doctor
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    // return this.doctorModel.create(createDoctorDto);
  }

  async findAll() {
    return this.doctorModel.findAll();
  }

  async findOne(id: number) {
    const doctor = await this.doctorModel.findByPk(id);
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async update(id: number, updateDto: UpdateDoctorDto) {
    const doctor = await this.findOne(id);
    return doctor.update(updateDto);
  }

  async remove(id: number) {
    const doctor = await this.findOne(id);
    await doctor.destroy();
    return { message: `Doctor #${id} deleted` };
  }

  async findByEmail(email: string) {
    const user = await this.doctorModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Doctor with Email: ${email} not found`);
    }
    return user;
  }
}
