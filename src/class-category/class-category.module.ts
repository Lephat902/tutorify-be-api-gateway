import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ClassCategoryController } from './class-category.controller'
import { ClassCategoryService } from './class-category.service'
import { QueueNames } from '@tutorify/shared'
import { Resolvers } from './resolvers'

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
  ],
  controllers: [ClassCategoryController],
  providers: [ClassCategoryService, ...Resolvers],
  exports: [ClassCategoryService,]
})
export class ClassCategoryModule { }
