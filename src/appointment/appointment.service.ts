import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment
  ) {}

  async create(createAppointmentDto:CreateAppointmentDto) {
    return this.appointmentModel.create(createAppointmentDto);
  }

  async findAll() {
    return this.appointmentModel.findAll();
  }

  async findOne(id: number) {
    const appointment = await this.appointmentModel.findByPk(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async update(id: number, updateDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);
    return appointment.update(updateDto);
  }

  async remove(id: number) {
    const appointment = await this.findOne(id);
    await appointment.destroy();
    return { message: `Appointment #${id} deleted` };
  }
}
