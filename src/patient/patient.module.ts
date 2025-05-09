import { forwardRef, Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';
import { MailService } from '../mail/mail.service';
import { MailModule } from '../mail/mail.module';
import { JwtTokenService } from '../auth/JwtService';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Patient]),
    MailModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
