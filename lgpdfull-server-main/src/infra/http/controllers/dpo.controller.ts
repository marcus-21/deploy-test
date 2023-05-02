import { Controller, Put, Post, Body, Get, Param, Patch, HttpCode, Delete } from '@nestjs/common';
import { DpoService } from 'src/app/use-cases/dpo.service';
import { CreateDpoDto } from '../dtos/create-dpo.dto';
import { UpdateDpoDto } from '../dtos/update-dpo.dto';

@Controller('dpo')
export class DpoController {
  constructor(private readonly dpoService: DpoService) {}

  @Post()
  create(@Body() createDpoDto: CreateDpoDto) {
    return this.dpoService.create(createDpoDto);
  }

  @Get('all/:id')
  findAll(@Param('id') /*userId*/ id: string ) {
    return this.dpoService.findAll(id);
  }

  @Get('actual/:id')
  findActual(@Param('id') /*userId*/ id: string ){
    return this.dpoService.findActual(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dpoService.findOne(id);
  }

  @Patch(':id')
  UpdateEmail(@Param('id') id: string, @Body() updateDpoDto: UpdateDpoDto){
    return this.dpoService.update(id, updateDpoDto);
  }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.dpoService.remove(id);
    }
}
