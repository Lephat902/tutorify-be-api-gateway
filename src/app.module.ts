import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { ClassCategoryModule } from './class-category/class-category.module';
import { ClassSessionModule } from './class-session/class-session.module';
import { ClassModule } from './class/class.module';
import { DateScalar } from './common/graphql';
import { FeedbackModule } from './feedback/feedback.module';
import { FileModule } from './file/file.module';
import { ReportModule } from './report/report.module';
import { StudentFavoriteTutorModule } from './student-favorite-tutor/student-favorite-tutor.module';
import { TutorApplyForClassModule } from './tutor-apply-for-class/tutor-apply-for-class.module';
import { TutorQueryModule } from './tutor-query/tutor-query.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';

@Module({
  imports: [
    AuthModule,
    FeedbackModule,
    ClassCategoryModule,
    ClassModule,
    TutorApplyForClassModule,
    StudentFavoriteTutorModule,
    UserPreferencesModule,
    TutorQueryModule,
    AddressModule,
    ClassSessionModule,
    ReportModule,
    FileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.example'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      //autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      nodeEnv: process.env.NODE_ENV,
      plugins: process.env.DISPLAY_GRAPHQL === '1' ?
        [ApolloServerPluginLandingPageLocalDefault()] :
        [],
      fieldResolverEnhancers: ['guards'], // Enable Guard for Field Resolver
      introspection: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: (error.extensions?.exception as any)?.response?.message || error.message,
        };
        return graphQLFormattedError;
      }
    }),
  ],
  providers: [DateScalar],
})
export class AppModule { }
