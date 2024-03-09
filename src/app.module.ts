import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FeedbackModule } from './feedback/feedback.module';
import { ClassCategoryModule } from './class-category/class-category.module';
import { ClassModule } from './class/class.module';
import { TutorApplyForClassModule } from './tutor-apply-for-class/tutor-apply-for-class.module';
import { StudentFavoriteTutorModule } from './student-favorite-tutor/student-favorite-tutor.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TutorQueryModule } from './tutor-query/tutor-query.module';
import { AddressModule } from './address/address.module';
import { ClassSessionModule } from './class-session/class-session.module';
import { DateScalar } from './common/graphql';
import { TutorProficientInClassCategoryModule } from './tutor-proficient-in-class-category/tutor-proficient-in-class-category.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    AuthModule,
    FeedbackModule,
    ClassCategoryModule,
    ClassModule,
    TutorApplyForClassModule,
    StudentFavoriteTutorModule,
    TutorProficientInClassCategoryModule,
    TutorQueryModule,
    AddressModule,
    ClassSessionModule,
    ReportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      fieldResolverEnhancers: ['guards'], // Enable Guard for Field Resolver
      introspection: true,
    }),
  ],
  providers: [DateScalar],
})
export class AppModule {}
