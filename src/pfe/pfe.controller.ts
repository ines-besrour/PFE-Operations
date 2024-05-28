import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { pfeService } from './pfe.service';
import { PFE } from '../Domains/pfe.schema';

@Controller('pfe')
export class pfeController {
  constructor(private readonly pfeService: pfeService) {}

  @Post()
  async create(@Body() createPFEDto: Partial<PFE>): Promise<PFE> {
    return this.pfeService.create(createPFEDto);
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
  async update(@Param('id') id: string, @Body() updatePFEDto: Partial<PFE>): Promise<PFE> {
    return this.pfeService.update(id, updatePFEDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PFE> {
    return this.pfeService.remove(id);
  }
}
