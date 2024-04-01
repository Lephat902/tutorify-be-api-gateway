import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FileUploadResponseDto, QueueNames } from '@tutorify/shared';

@Injectable()
export class FileService {
  constructor(
    @Inject(QueueNames.FILE)
    private readonly client: ClientProxy,
  ) { }

  uploadSingleFile(file: Express.Multer.File) {
    return firstValueFrom(this.client.send<FileUploadResponseDto>({ cmd: 'uploadSingleFile' }, { file }));
  }

  uploadMultipleFiles(files: Express.Multer.File[]) {
    return firstValueFrom(this.client.send({ cmd: 'uploadMultipleFiles' }, { files }));
  }

  deleteSingleFile(fileId: string) {
    return firstValueFrom(this.client.send({ cmd: 'deleteSingleFile' }, fileId));
  }

  deleteMultipleFiles(fileIds: string[]) {
    return firstValueFrom(this.client.send({ cmd: 'deleteMultipleFiles' }, fileIds));
  }
}
