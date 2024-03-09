import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { QueueNames } from '@tutorify/shared';
import { ClassPaginatedResultsResolver, ClassResolver } from './resolvers';
import { TutorApplyForClassModule } from 'src/tutor-apply-for-class/tutor-apply-for-class.module';

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
    forwardRef(() => TutorApplyForClassModule),
  ],
  controllers: [ClassController],
  providers: [ClassService, ClassResolver, ClassPaginatedResultsResolver],
  exports: [ClassService],
})
export class ClassModule {}
