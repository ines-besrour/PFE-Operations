import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { pfeService } from './pfe.service';
import { CreatePfeDto } from './create-pfe.dto';
import { PFE } from '../Domains/pfe.schema';

@Controller('pfe')
export class pfeController {
  constructor(private readonly pfeService: pfeService) {}

  @Post()
  async create(@Body() createPfeDto: CreatePfeDto): Promise<PFE> {
    return this.pfeService.create(createPfeDto);
  }

  @Get()
  async findAll(): Promise<PFE[]> {
    return this.pfeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PFE> {
    return this.pfeService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePfeDto: CreatePfeDto): Promise<PFE> {
    return this.pfeService.update(id, updatePfeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PFE> {
    return this.pfeService.remove(id);
  }
}
