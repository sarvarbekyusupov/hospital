import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabTestService } from './lab_test.service';
import { CreateLabTestDto } from './dto/create-lab_test.dto';
import { UpdateLabTestDto } from './dto/update-lab_test.dto';

@Controller('lab-test')
export class LabTestController {
  constructor(private readonly labTestService: LabTestService) {}

  @Post()
  create(@Body() createLabTestDto: CreateLabTestDto) {
    return this.labTestService.create(createLabTestDto);
  }

  @Get()
  findAll() {
    return this.labTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestService.update(+id, updateLabTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labTestService.remove(+id);
  }
}
