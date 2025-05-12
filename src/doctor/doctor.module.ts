import { forwardRef, Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './models/doctor.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Appointment } from '../appointment/models/appointment.model';

@Module({
  imports: [SequelizeModule.forFeature([Doctor, Appointment]),forwardRef(() => AuthModule)],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports:[DoctorService]
})
export class DoctorModule {}
