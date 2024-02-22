import { Module, Global } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { QueueNames } from '@tutorify/shared'

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      // without useFactory and async, SECRET cannot be read by configService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        global: true,
      }),
      inject: [ConfigService]
    }),
    ClientsModule.registerAsync([
      {
        name: QueueNames.AUTH,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: QueueNames.AUTH,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule, ClientsModule]
})
export class AuthModule { }
