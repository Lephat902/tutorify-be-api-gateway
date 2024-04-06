import { Module, forwardRef } from '@nestjs/common';
import { ClassSessionController } from './class-session.controller';
import { ClassSessionService } from './class-session.service';
import { AddressProxy, ProxiesModule } from '@tutorify/shared';
import { ClassModule } from 'src/class/class.module';
import { Resolvers } from './resolvers';
import { AddressModule } from 'src/address/address.module';
import { TutorQueryModule } from 'src/tutor-query/tutor-query.module';

@Module({
  imports: [
    ProxiesModule,
    forwardRef(() => ClassModule),
    AddressModule,
    TutorQueryModule,
  ],
  controllers: [ClassSessionController],
  providers: [
    ClassSessionService,
    AddressProxy,
    ...Resolvers
  ],
  exports: [ClassSessionService],
})
export class ClassSessionModule { }
