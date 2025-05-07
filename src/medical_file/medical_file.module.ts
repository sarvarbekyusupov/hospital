import { Module } from '@nestjs/common';
import { MedicalFileService } from './medical_file.service';
import { MedicalFileController } from './medical_file.controller';

@Module({
  controllers: [MedicalFileController],
  providers: [MedicalFileService],
})
export class MedicalFileModule {}
