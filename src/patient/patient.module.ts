import { forwardRef, Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';
import { JwtTokenService } from '../auth/JwtService';
import { AuthModule } from '../auth/auth.module';
import { PrescriptionModule } from '../prescription/prescription.module';
import { Prescription } from '../prescription/models/prescription.model';
import { PrescriptionItem } from '../prescription_item/models/prescription_item.model';
import { Medication } from '../medication/models/medication.model';
import { MedicalRecord } from '../medical_record/models/medical_record.model';
import { LabTest } from '../lab_test/models/lab_test.model';
import { Doctor } from '../doctor/models/doctor.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Patient,
      Prescription,
      PrescriptionItem,
      Medication,
      MedicalRecord,
      LabTest,
      Doctor,
    ]),
    MailModule,
    PrescriptionModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
