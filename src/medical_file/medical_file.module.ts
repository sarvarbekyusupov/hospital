import { Module } from '@nestjs/common';
import { MedicalFileService } from './medical_file.service';
import { MedicalFileController } from './medical_file.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalFile } from './models/medical_file.model';

@Module({
  imports: [SequelizeModule.forFeature([MedicalFile])],
  controllers: [MedicalFileController],
  providers: [MedicalFileService],
  exports:[MedicalFileService]
})
export class MedicalFileModule {}
