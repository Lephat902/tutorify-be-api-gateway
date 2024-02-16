import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ClassController } from './class.controller'
import { ClassService } from './class.service'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CLASS_SERVICE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: 'class',
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
