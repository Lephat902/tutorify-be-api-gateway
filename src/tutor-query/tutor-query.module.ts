import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TutorQueryService } from './tutor-query.service'
import { ClassModule } from 'src/class/class.module'
import { QueueNames } from '@tutorify/shared'
import { TutorResolver } from './resolvers'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: QueueNames.TUTOR_QUERY,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: QueueNames.TUTOR_QUERY,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    ClassModule,
  ],
  providers: [TutorQueryService, TutorResolver],
})
export class TutorQueryModule { }
