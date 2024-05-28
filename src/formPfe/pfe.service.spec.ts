import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { pfeService } from './pfe.service';
import { PFE } from '../Domains/pfe.schema';

const mockPFE = {
  sujet: 'Sample Sujet',
  dateDebut: new Date(),
  dateFin: new Date(),
  sessionDeSoutenance: '2024-06',
  student: '60d0fe4f5311236168a109ca',
  entreprise: '60d0fe4f5311236168a109cb',
};

describe('pfeService', () => {
  let service: pfeService;
  let model: Model<PFE>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        pfeService,
        {
          provide: getModelToken(PFE.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockPFE),
            constructor: jest.fn().mockResolvedValue(mockPFE),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
            create: jest.fn().mockResolvedValue(mockPFE),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<pfeService>(pfeService);
    model = module.get<Model<PFE>>(getModelToken(PFE.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new PFE', async () => {
    jest.spyOn(model, 'create').mockResolvedValueOnce(mockPFE as any);
    const createdPFE = await service.create(mockPFE);
    expect(createdPFE).toEqual(mockPFE);
  });

  it('should return all PFEs', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([mockPFE]),
    } as any);
    const pfes = await service.findAll();
    expect(pfes).toEqual([mockPFE]);
  });

  it('should return a PFE by ID', async () => {
    jest.spyOn(model, 'findById').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(mockPFE),
    } as any);
    const pfe = await service.findOne('someId');
    expect(pfe).toEqual(mockPFE);
  });

  it('should update a PFE by ID', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(mockPFE),
    } as any);
    const updatedPFE = await service.update('someId', mockPFE);
    expect(updatedPFE).toEqual(mockPFE);
  });

  it('should delete a PFE by ID', async () => {
    jest.spyOn(model, 'findByIdAndRemove').mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(mockPFE),
    } as any);
    const deletedPFE = await service.remove('someId');
    expect(deletedPFE).toEqual(mockPFE);
  });
});
