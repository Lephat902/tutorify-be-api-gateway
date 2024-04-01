import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FileService } from './file.service';
import { QueueNames } from '@tutorify/shared';
import { FileController } from './file.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: QueueNames.FILE,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: QueueNames.FILE,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule { }
