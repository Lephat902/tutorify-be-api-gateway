import { Global, Module } from '@nestjs/common';
import { ProxiesModule } from '@tutorify/shared';
import { AddressController } from './address.controller';
import { Resolvers } from './resolvers';

@Global()
@Module({
  imports: [
    ProxiesModule
  ],
  controllers: [AddressController],
  providers: Resolvers,
})
export class AddressModule { }
