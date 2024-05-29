import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PFE, PFESchema } from '../Domains/pfe.schema';
import { pfeController } from './pfe.controller';
import { pfeService } from './pfe.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: PFE.name, schema: PFESchema }])],  
  controllers: [pfeController],
  providers: [pfeService],
})
export class PfeModule {}
