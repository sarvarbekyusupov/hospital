import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalFileService } from './medical_file.service';
import { CreateMedicalFileDto } from './dto/create-medical_file.dto';
import { UpdateMedicalFileDto } from './dto/update-medical_file.dto';

@Controller('medical-file')
export class MedicalFileController {
  constructor(private readonly medicalFileService: MedicalFileService) {}

  @Post()
  create(@Body() createMedicalFileDto: CreateMedicalFileDto) {
    return this.medicalFileService.create(createMedicalFileDto);
  }

  @Get()
  findAll() {
    return this.medicalFileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalFileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicalFileDto: UpdateMedicalFileDto) {
    return this.medicalFileService.update(+id, updateMedicalFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicalFileService.remove(+id);
  }
}
