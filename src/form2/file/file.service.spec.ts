import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FileService } from './file.service';
import {
  mockConventionModel,
  mockLettreAffectationModel,
  mockFicheDePropositionModel,
} from './mockModel';

describe('FileService', () => {
  let service: FileService;
  let conventionModel: ReturnType<typeof mockConventionModel>;
  let lettreAffectationModel: ReturnType<typeof mockLettreAffectationModel>;
  let ficheDePropositionModel: ReturnType<typeof mockFicheDePropositionModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<FileService>(FileService);

    conventionModel = module.get(getModelToken('Convention'));
    lettreAffectationModel = module.get(getModelToken('LettreAffectation'));
    ficheDePropositionModel = module.get(getModelToken('FicheDeProposition'));

    (conventionModel.exec as jest.Mock).mockImplementation(() =>
      Promise.resolve({ fileName: 'test.pdf' }),
    );
    (conventionModel.findOne as jest.Mock).mockImplementation(() => ({
      exec: () => Promise.resolve({ fileName: 'test.pdf' }),
    }));
    (conventionModel.findOneAndDelete as jest.Mock).mockImplementation(() => ({
      exec: () => Promise.resolve({}),
    }));
  });

  it('should upload a convention file', async () => {
    const file: Express.Multer.File = {
      buffer: Buffer.from('test content'),
      originalname: 'test.pdf',
    } as any;
    const studentId = '60d0fe4f5311236168a109ca';
    const fileType = 'convention';

    await expect(
      service.uploadFile(file, studentId, fileType),
    ).resolves.toBeDefined();
    expect(conventionModel.create).toHaveBeenCalledWith({
      student: studentId,
      fileName: expect.stringContaining('test.pdf'),
    });
  });

  it('should get a convention file by studentId', async () => {
    const studentId = '60d0fe4f5311236168a109ca';
    const fileType = 'convention';

    await expect(
      service.getFileByStudentId(studentId, fileType),
    ).resolves.toEqual({ fileName: 'test.pdf' });
    expect(conventionModel.findOne).toHaveBeenCalledWith({
      student: studentId,
    });
  });

  it('should delete a convention file by studentId', async () => {
    const studentId = '60d0fe4f5311236168a109ca';
    const fileType = 'convention';

    await expect(
      service.deleteFileByStudentId(studentId, fileType),
    ).resolves.toEqual({ message: 'File deleted successfully' });
    expect(conventionModel.findOneAndDelete).toHaveBeenCalledWith({
      student: studentId,
    });
  });
});
