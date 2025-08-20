import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { put } from '@vercel/blob';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  async handleUpload(base64: string): Promise<string> {
    if (!base64) return '';
    const file = await fetch(base64).then((res) => res.blob());
    const extension = file.type.substring(file.type.lastIndexOf('/') + 1);
    const fileName = `${uuidv4()}.${extension}`;

    const blob = await put(fileName, file, {
      access: 'public',
      token: this.configService.get('BLOB_READ_WRITE_TOKEN'),
    });

    return blob.url;
  }
}
