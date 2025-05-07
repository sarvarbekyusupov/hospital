import { Module } from "@nestjs/common";
import { DepartmentService } from "./departments.service";
import { DepartmentsController } from "./departments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Department } from "./models/department.model";

@Module({
  imports: [SequelizeModule.forFeature([Department])],
  controllers: [DepartmentsController],
  providers: [DepartmentService],
  exports:[DepartmentService]
})
export class DepartmentsModule {}
