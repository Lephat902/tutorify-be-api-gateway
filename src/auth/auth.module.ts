import { Module, Global } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ProxiesModule } from '@tutorify/shared';
import { Resolvers } from './resolvers';
import { UserPreferencesModule } from 'src/user-preferences/user-preferences.module';
import { ClassCategoryModule } from 'src/class-category/class-category.module';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      // without useFactory and async, SECRET cannot be read by configService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('SECRET'),
        global: true,
      }),
      inject: [ConfigService],
    }),
    ProxiesModule,
    UserPreferencesModule,
    ClassCategoryModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...Resolvers],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
