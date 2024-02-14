import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { FeedbackModule } from './feedback/feedback.module'
import { FileModule } from './file/file.module'
import { ClassCategoryModule } from './class-category/class-category.module'

@Module({
  imports: [
    AuthModule,
    FeedbackModule,
    FileModule,
    ClassCategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
    })
  ],
})
export class AppModule { }
