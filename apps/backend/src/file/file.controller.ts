import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FileService } from './file.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseGuards(AuthGuard)
  async uploadFile(@Body() body: any) {
    const base64 = body.base64;
    const url = await this.fileService.handleUpload(base64);
    return url 
  }
}
