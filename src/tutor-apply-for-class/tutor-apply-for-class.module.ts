import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TutorApplyForClassController } from './tutor-apply-for-class.controller';
import { TutorApplyForClassService } from './tutor-apply-for-class.service';
import { ClassModule } from 'src/class/class.module';
import { QueueNames } from '@tutorify/shared';
import { TutorApplyForClassResolver } from './resolvers';
import { TutorQueryModule } from 'src/tutor-query/tutor-query.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: QueueNames.TUTOR_APPLY_FOR_CLASS,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: QueueNames.TUTOR_APPLY_FOR_CLASS,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    forwardRef(() => ClassModule),
    TutorQueryModule,
  ],
  controllers: [TutorApplyForClassController],
  providers: [TutorApplyForClassService, TutorApplyForClassResolver],
  exports: [TutorApplyForClassService],
})
export class TutorApplyForClassModule {}
