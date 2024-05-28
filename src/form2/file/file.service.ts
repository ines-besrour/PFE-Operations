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
import { Multer } from 'multer';

@Injectable()
export class FileService {
  // private readonly uploadPath = join(
  //   __dirname,
  //   '..',
  //   '..',
  //   '..',
  //   'src',
  //   'form2',
  //   'uploads',
  // );

  constructor(
    @InjectModel('Convention')
    private readonly conventionModel: Model<ConventionDocument>,
    @InjectModel('LettreAffectation')
    private readonly lettreAffectationModel: Model<LettreAffectationDocument>,
    @InjectModel('FicheDeProposition')
    private readonly ficheDePropositionModel: Model<FicheDePropositionDocument>,
  ) {
    // if (!existsSync(this.uploadPath)) {
    //   mkdirSync(this.uploadPath, { recursive: true });
  }

  async uploadFile(
    file: Multer.File,
    studentId: string,
    fileType: string,
  ): Promise<string> {
    const fileName = `${uuidv4()}-${file.originalname}`;

    // const filePath = join(this.uploadPath, fileName);
    // writeFileSync(filePath, file.buffer);

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

  // async getFile(fileName: string): Promise<Buffer> {
  //   const filePath = join(this.uploadPath, fileName);
  //   if (!existsSync(filePath)) {
  //     throw new NotFoundException('File not found');
  //   }
  //   return readFileSync(filePath);
  // }

  // async deleteFile(fileName: string): Promise<void> {
  //   const filePath = join(this.uploadPath, fileName);
  //   if (!existsSync(filePath)) {
  //     throw new NotFoundException('File not found');
  //   }
  //   unlinkSync(filePath);
  // }
  async getFileByStudentId(studentId: string, fileType: string): Promise<any> {
    let fileData: any;

    switch (fileType) {
      case 'convention':
        fileData = await this.conventionModel
          .findOne({ student: studentId })
          .exec();
        break;
      case 'lettreAffectation':
        fileData = await this.lettreAffectationModel
          .findOne({ student: studentId })
          .exec();
        break;
      case 'ficheDeProposition':
        fileData = await this.ficheDePropositionModel
          .findOne({ student: studentId })
          .exec();
        break;
      default:
        throw new NotFoundException('Invalid file type');
    }

    if (!fileData) {
      throw new NotFoundException('File not found');
    }

    return fileData; // Return the entire file data
  }

  async deleteFileByStudentId(
    studentId: string,
    fileType: string,
  ): Promise<{ message: string }> {
    let result;

    switch (fileType) {
      case 'convention':
        result = await this.conventionModel
          .findOneAndDelete({ student: studentId })
          .exec();
        break;
      case 'lettreAffectation':
        result = await this.lettreAffectationModel
          .findOneAndDelete({ student: studentId })
          .exec();
        break;
      case 'ficheDeProposition':
        result = await this.ficheDePropositionModel
          .findOneAndDelete({ student: studentId })
          .exec();
        break;
      default:
        throw new NotFoundException('Invalid file type');
    }

    if (!result) {
      throw new NotFoundException('File not found');
    }

    return { message: 'File deleted successfully' };
  }
}
