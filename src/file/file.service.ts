import { HttpException, Injectable } from '@nestjs/common'
import { Client, ClientProxy, Transport } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs';
import { FileMetadataDto } from './file.dto'

@Injectable()
export class FileService {
  @Client({
    options: { host: 'file', port: 3000 },
    transport: Transport.TCP,
  })
  public client: ClientProxy

  public async upload(
    file: Express.Multer.File,
    meta: FileMetadataDto
  ): Promise<Express.Multer.File> {
    const result = this.client
      .send<Express.Multer.File>({ cmd: 'uploadFile' }, { file, meta });
    return lastValueFrom(result)
      .catch(error => {
        throw new HttpException(error, error.status);
      });
  }

  public async download(meta: FileMetadataDto): Promise<string | Buffer> {
    const result = this.client
      .send<string | Buffer>({ cmd: 'downloadFile' }, meta);
    return lastValueFrom(result)
      .catch(error => {
        throw new HttpException(error, error.status);
      });
  }
}
