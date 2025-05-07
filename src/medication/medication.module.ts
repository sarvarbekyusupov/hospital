import { Module } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Medication } from './models/medication.model';

@Module({
  imports: [SequelizeModule.forFeature([Medication])],
  controllers: [MedicationController],
  providers: [MedicationService],
  exports:[MedicationService]
})
export class MedicationModule {}
