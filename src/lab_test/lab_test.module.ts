import { Module } from '@nestjs/common';
import { LabTestService } from './lab_test.service';
import { LabTestController } from './lab_test.controller';

@Module({
  controllers: [LabTestController],
  providers: [LabTestService],
})
export class LabTestModule {}
