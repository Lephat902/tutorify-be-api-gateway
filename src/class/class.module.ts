import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ClassController } from './class.controller'
import { ClassService } from './class.service'
import { QueueNames } from '@tutorify/shared'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: QueueNames.CLASS_AND_CATEGORY,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: QueueNames.CLASS_AND_CATEGORY,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService,]
})
export class ClassModule { }
