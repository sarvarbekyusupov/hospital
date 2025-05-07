import { Module } from '@nestjs/common';
import { LabTestService } from './lab_test.service';
import { LabTestController } from './lab_test.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabTest } from './models/lab_test.model';

@Module({
  imports: [SequelizeModule.forFeature([LabTest])],
  controllers: [LabTestController],
  providers: [LabTestService],
  exports:[LabTestService]
})
export class LabTestModule {}
