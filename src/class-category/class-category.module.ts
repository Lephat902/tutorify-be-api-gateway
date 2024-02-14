import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ClassCategoryController } from './class-category.controller'
import { ClassCategoryService } from './class-category.service'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CLASS_CATEGORY_SERVICE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: 'class-category',
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [ClassCategoryController],
  providers: [ClassCategoryService],
  exports: [ClassCategoryService,]
})
export class ClassCategoryModule { }
