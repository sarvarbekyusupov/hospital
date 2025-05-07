import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';

@Module({
  imports: [SequelizeModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [PatientService],
  exports:[PatientService]
})
export class PatientModule {}
