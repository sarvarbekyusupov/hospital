import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";
import { StaffModule } from "./staff/staff.module";
import { NotificationModule } from "./notification/notification.module";
import { PatientModule } from "./patient/patient.module";
import { AppointmentModule } from "./appointment/appointment.module";
import { PaymentModule } from "./payment/payment.module";
import { MedicationModule } from "./medication/medication.module";
import { PrescriptionItemModule } from "./prescription_item/prescription_item.module";
import { LabTestModule } from "./lab_test/lab_test.module";
import { MedicalRecordModule } from "./medical_record/medical_record.module";
import { PrescriptionModule } from "./prescription/prescription.module";
import { DoctorModule } from "./doctor/doctor.module";
import { DepartmentsModule } from "./departments/departments.module";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { ConfigModule } from "@nestjs/config";
import { Admin } from "./admin/models/admin.model";
import { Appointment } from "./appointment/models/appointment.model";
import { Department } from "./departments/models/department.model";
import { Doctor } from "./doctor/models/doctor.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { LabTest } from "./lab_test/models/lab_test.model";
import { MedicalRecord } from "./medical_record/models/medical_record.model";
import { Medication } from "./medication/models/medication.model";
import { Notification } from "./notification/models/notification.model";
import { Patient } from "./patient/models/patient.model";
import { Payment } from "./payment/models/payment.model";
import { Prescription } from "./prescription/models/prescription.model";
import { PrescriptionItem } from "./prescription_item/models/prescription_item.model";
import { Staff } from "./staff/models/staff.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
       Admin,
       Appointment,
       Department,
       Doctor,
       LabTest,
       MedicalRecord,
       Medication,
       Notification,
       Patient,
       Payment,
       Prescription,
       PrescriptionItem,
       Staff
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),

    AdminModule,
    StaffModule,
    NotificationModule,
    PatientModule,
    AppointmentModule,
    PaymentModule,
    MedicationModule,
    PrescriptionItemModule,
    LabTestModule,
    MedicalRecordModule,
    PrescriptionModule,
    DoctorModule,
    DepartmentsModule,
    AuthModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
