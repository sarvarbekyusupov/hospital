import { Module } from '@nestjs/common';
import { PrescriptionItemService } from './prescription_item.service';
import { PrescriptionItemController } from './prescription_item.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PrescriptionItem } from './models/prescription_item.model';

@Module({
  imports: [SequelizeModule.forFeature([PrescriptionItem])],
  controllers: [PrescriptionItemController],
  providers: [PrescriptionItemService],
  exports:[PrescriptionItemService]
})
export class PrescriptionItemModule {}
