import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import {
  existsSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  unlinkSync,
  readdirSync,
} from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { ConventionDocument } from '../../Domains/convention.schema';
import { LettreAffectationDocument } from '../../Domains/LettreAffectation.schema';
import { FicheDePropositionDocument } from '../../Domains/ficheDeProposition.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FileService {
  private readonly uploadPath = join(
    __dirname,
    '..',
    '..',
    '..',
    'src',
    'form2',
    'uploads',
  );
  // constructor() {
  //   if (!existsSync(this.uploadPath)) {
  //     mkdirSync(this.uploadPath, { recursive: true });
  //   }
  // }
  //
  // async uploadFile(file: Express.Multer.File): Promise<string> {
  //   const fileName = `${uuidv4()}-${file.originalname}`;
  //   const filePath = join(this.uploadPath, fileName);
  //   writeFileSync(filePath, file.buffer);
  //   return fileName;
  // }
  //
  // async getFile(fileName: string): Promise<Buffer> {
  //   const filePath = join(this.uploadPath, fileName);
  //   if (!existsSync(filePath)) {
  //     throw new NotFoundException('File not found');
  //   }
  //   return readFileSync(filePath);
  // }
  //
  // async deleteFile(fileName: string): Promise<void> {
  //   const filePath = join(this.uploadPath, fileName);
  //   if (!existsSync(filePath)) {
  //     throw new NotFoundException('File not found');
  //   }
  //   unlinkSync(filePath);
  // }
  //
  // async getAllFiles(): Promise<string[]> {
  //   return readdirSync(this.uploadPath);
  // }
  constructor(
    @InjectModel('Convention')
    private readonly conventionModel: Model<ConventionDocument>,
    @InjectModel('LettreAffectation')
    private readonly lettreAffectationModel: Model<LettreAffectationDocument>,
    @InjectModel('FicheDeProposition')
    private readonly ficheDePropositionModel: Model<FicheDePropositionDocument>,
  ) {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    studentId: string,
    fileType: string,
  ): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const filePath = join(this.uploadPath, fileName);
    writeFileSync(filePath, file.buffer);

    switch (fileType) {
      case 'convention':
        await this.conventionModel.create({
          student: studentId,
          fileName: fileName,
        });
        break;
      case 'lettreAffectation':
        await this.lettreAffectationModel.create({
          student: studentId,
          fileName: fileName,
        });
        break;
      case 'ficheDeProposition':
        await this.ficheDePropositionModel.create({
          student: studentId,
          fileName: fileName,
        });
        break;
      default:
        throw new NotFoundException('Invalid file type');
    }

    return fileName;
  }

  async getFile(fileName: string): Promise<Buffer> {
    const filePath = join(this.uploadPath, fileName);
    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    return readFileSync(filePath);
  }

  async deleteFile(fileName: string): Promise<void> {
    const filePath = join(this.uploadPath, fileName);
    if (!existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    unlinkSync(filePath);
  }
}
