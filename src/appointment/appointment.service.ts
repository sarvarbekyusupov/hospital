import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';
import { Patient } from '../patient/models/patient.model';
import { Doctor } from '../doctor/models/doctor.model';
import { Op } from 'sequelize';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment,
    @InjectModel(Doctor)
    private doctorModel: typeof Doctor,
    @InjectModel(Patient)
    private patientModel: typeof Patient
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const doctor = await this.doctorModel.findByPk(
      createAppointmentDto.doctor_id
    );
    if (!doctor) {
      throw new NotFoundException(
        `Doctor with ID ${createAppointmentDto.doctor_id} not found`
      );
    }

    // Validate patient_id
    const patient = await this.patientModel.findByPk(
      createAppointmentDto.patient_id
    );
    if (!patient) {
      throw new NotFoundException(
        `Patient with ID ${createAppointmentDto.patient_id} not found`
      );
    }

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
