import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { FeedbackModule } from './feedback/feedback.module'
import { FileModule } from './file/file.module'

@Module({
  imports: [
    AuthModule,
    FeedbackModule,
    FileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
    })
  ],
})
export class AppModule { }
