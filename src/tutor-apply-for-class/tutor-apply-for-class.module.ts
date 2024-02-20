import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TutorApplyForClassController } from './tutor-apply-for-class.controller'
import { TutorApplyForClassService } from './tutor-apply-for-class.service'
import { ClassModule } from 'src/class/class.module'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'TUTOR_APPLY_FOR_CLASS_SERVICE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: 'tutor-apply-for-class',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    ClassModule,
  ],
  controllers: [TutorApplyForClassController],
  providers: [TutorApplyForClassService],
})
export class TutorApplyForClassModule { }
