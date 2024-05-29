import { Test, TestingModule } from '@nestjs/testing';
import { pfeService } from './pfe.service';
import { pfeController } from './pfe.controller';
import { PFE } from '../Domains/pfe.schema';
import { CreatePfeDto } from './create-pfe.dto';
import mongoose from 'mongoose';

const mockPFE: CreatePfeDto = {
  sujet: 'Sample Sujet',
  dateDebut: new Date(),
  dateFin: new Date(),
  sessionDeSoutenance: '2024-06',
  student: new mongoose.Types.ObjectId('60d0fe4f5311236168a109ca'),
  entreprise: new mongoose.Types.ObjectId('60d0fe4f5311236168a109cb'),
};

describe('pfeController', () => {
  let controller: pfeController;
  let service: pfeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [pfeController],
      providers: [
        {
          provide: pfeService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockPFE),
            findAll: jest.fn().mockResolvedValue([mockPFE]),
            findOne: jest.fn().mockResolvedValue(mockPFE),
            update: jest.fn().mockResolvedValue(mockPFE),
            remove: jest.fn().mockResolvedValue(mockPFE),
          },
        },
      ],
    }).compile();

    controller = module.get<pfeController>(pfeController);
    service = module.get<pfeService>(pfeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new PFE', async () => {
    const result = await controller.create(mockPFE);
    expect(result).toEqual(mockPFE);
    expect(service.create).toHaveBeenCalledWith(mockPFE);
  });

  it('should return all PFEs', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockPFE]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a PFE by ID', async () => {
    const result = await controller.findOne('someId');
    expect(result).toEqual(mockPFE);
    expect(service.findOne).toHaveBeenCalledWith('someId');
  });

  it('should update a PFE by ID', async () => {
    const result = await controller.update('someId', mockPFE);
    expect(result).toEqual(mockPFE);
    expect(service.update).toHaveBeenCalledWith('someId', mockPFE);
  });

  it('should delete a PFE by ID', async () => {
    const result = await controller.remove('someId');
    expect(result).toEqual(mockPFE);
    expect(service.remove).toHaveBeenCalledWith('someId');
  });
});
