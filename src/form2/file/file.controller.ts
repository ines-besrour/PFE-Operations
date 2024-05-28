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

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  //
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadFile(
  //   @UploadedFile() file: Express.Multer.File,
  // ): Promise<{ fileName: string }> {
  //   const fileName = await this.fileService.uploadFile(file);
  //   return { fileName };
  // }
  //
  // @Get(':fileName')
  // async getFile(
  //   @Param('fileName') fileName: string,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   const file = await this.fileService.getFile(fileName);
  //   res.send(file);
  // }
  //
  // @Delete(':fileName')
  // async deleteFile(@Param('fileName') fileName: string): Promise<void> {
  //   await this.fileService.deleteFile(fileName);
  // }
  //
  // @Get()
  // async getAllFiles(): Promise<string[]> {
  //   return this.fileService.getAllFiles();
  // }

  @Post('upload/:studentId/:fileType')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
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

  // @Get(':fileName')
  // async getFile(
  //   @Param('fileName') fileName: string,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   const file = await this.fileService.getFile(fileName);
  //   res.send(file);
  // }

  // @Delete(':fileName')
  // async deleteFile(@Param('fileName') fileName: string): Promise<void> {
  //   await this.fileService.deleteFile(fileName);
  // }
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
