import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TutorProficientInClassCategoryService } from './tutor-proficient-in-class-category.service'
import { ClassModule } from 'src/class/class.module'
import { QueueNames } from '@tutorify/shared'
import { TutorProficientInClassCategoryController } from './tutor-proficient-in-class-category.controller'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: QueueNames.TUTOR_PROFICIENT_IN_CLASS_CATEGORY,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: QueueNames.TUTOR_PROFICIENT_IN_CLASS_CATEGORY,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    ClassModule,
  ],
  controllers: [TutorProficientInClassCategoryController],
  providers: [TutorProficientInClassCategoryService],
})
export class TutorProficientInClassCategoryModule { }
