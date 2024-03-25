import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserPreferencesService } from './user-preferences.service';
import { ClassModule } from 'src/class/class.module';
import { QueueNames } from '@tutorify/shared';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: QueueNames.USER_PREFERENCES,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: QueueNames.USER_PREFERENCES,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
    ClassModule,
  ],
  providers: [UserPreferencesService],
  exports: [UserPreferencesService],
})
export class UserPreferencesModule {}
