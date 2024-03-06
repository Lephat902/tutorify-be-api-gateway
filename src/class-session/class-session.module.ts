import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClassSessionController } from './class-session.controller';
import { ClassSessionService } from './class-session.service';
import { QueueNames } from '@tutorify/shared';
import { ClassModule } from 'src/class/class.module';
import { ClassSessionResolver } from './resolvers';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: QueueNames.CLASS_SESSION,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: QueueNames.CLASS_SESSION,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    ClassModule,
  ],
  controllers: [ClassSessionController],
  providers: [ClassSessionService, ClassSessionResolver],
  exports: [ClassSessionService],
})
export class ClassSessionModule {}
