import { Test, TestingModule } from '@nestjs/testing';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { getModelToken } from '@nestjs/mongoose';
import {
  mockConventionModel,
  mockLettreAffectationModel,
  mockFicheDePropositionModel,
} from './mockModel';

describe('FileController', () => {
  let controller: FileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        FileService,
        {
          provide: getModelToken('Convention'),
          useValue: mockConventionModel(),
        },
        {
          provide: getModelToken('LettreAffectation'),
          useValue: mockLettreAffectationModel(),
        },
        {
          provide: getModelToken('FicheDeProposition'),
          useValue: mockFicheDePropositionModel(),
        },
      ],
    }).compile();

    controller = module.get<FileController>(FileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});