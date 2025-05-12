import { Module } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { AppointmentController } from "./appointment.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Appointment } from "./models/appointment.model";
import { DoctorModule } from "../doctor/doctor.module";
import { PatientModule } from "../patient/patient.module";
import { Doctor } from "../doctor/models/doctor.model";
import { Patient } from "../patient/models/patient.model";

@Module({
  imports: [SequelizeModule.forFeature([Appointment, Doctor, Patient])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService],
})
export class AppointmentModule {}
