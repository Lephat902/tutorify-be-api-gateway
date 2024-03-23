import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueNames } from '@tutorify/shared';
import { Resolvers } from './resolvers';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: QueueNames.FEEDBACK,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: QueueNames.FEEDBACK,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService, ...Resolvers],
  exports: [FeedbackService],
})
export class FeedbackModule {}
