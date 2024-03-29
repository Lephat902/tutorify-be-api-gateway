import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClassSessionController } from './class-session.controller';
import { ClassSessionService } from './class-session.service';
import { QueueNames } from '@tutorify/shared';
import { ClassModule } from 'src/class/class.module';
import { Resolvers } from './resolvers';
import { AddressModule } from 'src/address/address.module';
import { TutorQueryModule } from 'src/tutor-query/tutor-query.module';

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
    forwardRef(() => ClassModule),
    AddressModule,
    TutorQueryModule,
  ],
  controllers: [ClassSessionController],
  providers: [ClassSessionService, ...Resolvers],
  exports: [ClassSessionService],
})
export class ClassSessionModule {}
