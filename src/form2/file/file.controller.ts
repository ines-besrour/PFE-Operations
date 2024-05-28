import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileService } from './file.service';
import { Multer } from 'multer'; // Add this import statement

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
    @UploadedFile() file: Multer.File,
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

  @Get(':fileName')
  async getFile(
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ): Promise<void> {
    const file = await this.fileService.getFile(fileName);
    res.send(file);
  }

  @Delete(':fileName')
  async deleteFile(@Param('fileName') fileName: string): Promise<void> {
    await this.fileService.deleteFile(fileName);
  }
}
