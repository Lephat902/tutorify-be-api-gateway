import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TutorQueryService } from './tutor-query.service';
import { QueueNames } from '@tutorify/shared';
import { TutorPaginatedResultsResolver, TutorResolver } from './resolvers';

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
  ],
  providers: [
    TutorQueryService, 
    TutorPaginatedResultsResolver,
    TutorResolver,
  ],
  exports: [TutorQueryService],
})
export class TutorQueryModule {}
