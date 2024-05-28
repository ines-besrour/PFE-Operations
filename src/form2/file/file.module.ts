import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LettreAffectation,
  LettreAffectationSchema,
} from '../../Domains/LettreAffectation.schema';
import {
  FicheDeProposition,
  FicheDePropositionSchema,
} from '../../Domains/ficheDeProposition.schema';
import { Convention, ConventionSchema } from '../../Domains/convention.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Convention.name, schema: ConventionSchema },
      { name: LettreAffectation.name, schema: LettreAffectationSchema },
      { name: FicheDeProposition.name, schema: FicheDePropositionSchema },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
