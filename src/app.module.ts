import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { FeedbackModule } from './feedback/feedback.module'
import { ClassCategoryModule } from './class-category/class-category.module'
import { ClassModule } from './class/class.module'
import { TutorApplyForClassModule } from './tutor-apply-for-class/tutor-apply-for-class.module'
import { StudentFavoriteTutorModule } from './student-favorite-tutor/student-favorite-tutor.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    AuthModule,
    FeedbackModule,
    ClassCategoryModule,
    ClassModule,
    TutorApplyForClassModule,
    StudentFavoriteTutorModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
})
export class AppModule { }