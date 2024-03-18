import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QueueNames } from '@tutorify/shared';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { Resolvers } from './resolvers';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: QueueNames.ADDRESS,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: QueueNames.ADDRESS,
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [AddressController],
  providers: [AddressService, ...Resolvers],
  exports: [AddressService],
})
export class AddressModule {}
