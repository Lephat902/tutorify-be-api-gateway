import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { StudentFavoriteTutorService } from './student-favorite-tutor.service'
import { ClassModule } from 'src/class/class.module'
import { QueueNames } from '@tutorify/shared'
import { StudentFavoriteTutorController } from './student-favorite-tutor.controller'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: QueueNames.STUDENT_FAVORITE_TUTOR,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: QueueNames.STUDENT_FAVORITE_TUTOR,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    ClassModule,
  ],
  controllers: [StudentFavoriteTutorController],
  providers: [StudentFavoriteTutorService],
})
export class StudentFavoriteTutorModule { }
