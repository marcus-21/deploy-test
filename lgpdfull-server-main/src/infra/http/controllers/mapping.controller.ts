import { Controller, Get, Post, Body, Put, Param, Delete, Patch, HttpCode } from '@nestjs/common';
import { MappingService } from 'src/app/use-cases/mapping.service';
import { CreateMappingDto } from '../dtos/create-mapping.dto';
import { UpdateMappingDto } from '../dtos/update-mapping.dto';

@Controller('mapping')
export class MappingController {
  constructor(private readonly mappingService: MappingService) {}

  @Post()
  create(@Body() createMappingDto: CreateMappingDto) {
    return this.mappingService.create(createMappingDto);
  }

  @Get('all/:id')
  findAll(@Param('id') /*userId*/ id: string) {
    return this.mappingService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mappingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMappingDto: UpdateMappingDto) {
    return this.mappingService.update(id, updateMappingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mappingService.remove(id);
  }
}
