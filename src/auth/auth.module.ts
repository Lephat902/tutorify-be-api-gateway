import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

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

    ClientsModule.register([{
      name: 'AUTH_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'auth',
        queueOptions: {
          durable: false
        }
      }
    }])
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }
