import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileService } from './file.service';
import { Express } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload/:studentId/:fileType')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File, // Using the correct type for file

    @Param('studentId') studentId: string,
    @Param('fileType') fileType: string,
  ): Promise<{ fileName: string }> {
    const fileName = await this.fileService.uploadFile(
      file,
      studentId,
      fileType,
    );
    return { fileName };
  }

  @Get(':studentId/:fileType')
  async getFileByStudentId(
    @Param('studentId') studentId: string,
    @Param('fileType') fileType: string,
  ): Promise<Buffer> {
    try {
      const fileData = await this.fileService.getFileByStudentId(
        studentId,
        fileType,
      );
      return fileData;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':studentId/:fileType')
  async deleteFileByStudentId(
    @Param('studentId') studentId: string,
    @Param('fileType') fileType: string,
  ): Promise<{ message: string }> {
    try {
      const result = await this.fileService.deleteFileByStudentId(
        studentId,
        fileType,
      );
      return result;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
