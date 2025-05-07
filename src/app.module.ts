import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { StaffModule } from './staff/staff.module';
import { NotificationModule } from './notification/notification.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PaymentModule } from './payment/payment.module';
import { MedicationModule } from './medication/medication.module';
import { PrescriptionItemModule } from './prescription_item/prescription_item.module';
import { LabTestModule } from './lab_test/lab_test.module';
import { MedicalRecordModule } from './medical_record/medical_record.module';
import { MedicalFileModule } from './medical_file/medical_file.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { DoctorModule } from './doctor/doctor.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [AdminModule, StaffModule, NotificationModule, PatientModule, AppointmentModule, PaymentModule, MedicationModule, PrescriptionItemModule, LabTestModule, MedicalRecordModule, MedicalFileModule, PrescriptionModule, DoctorModule, DepartmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
