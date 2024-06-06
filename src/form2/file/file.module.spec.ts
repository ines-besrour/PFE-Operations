import { Test, TestingModule } from '@nestjs/testing';
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
import { MongoClient } from 'mongodb';

describe('FileModule', () => {
  let module: TestingModule;
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__);
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-test'), // Use a local MongoDB for testing
        MongooseModule.forFeature([
          { name: Convention.name, schema: ConventionSchema },
          { name: LettreAffectation.name, schema: LettreAffectationSchema },
          { name: FicheDeProposition.name, schema: FicheDePropositionSchema },
        ]),
      ],
      controllers: [FileController],
      providers: [FileService],
    }).compile();
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
