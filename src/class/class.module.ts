import { Module, forwardRef } from '@nestjs/common';
import { ProxiesModule } from '@tutorify/shared';
import { ClassSessionModule } from 'src/class-session/class-session.module';
import { TutorApplyForClassModule } from 'src/tutor-apply-for-class/tutor-apply-for-class.module';
import { TutorQueryModule } from 'src/tutor-query/tutor-query.module';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { Resolvers } from './resolvers';

@Module({
  imports: [
    ProxiesModule,
    forwardRef(() => TutorApplyForClassModule),
    TutorQueryModule,
    forwardRef(() => ClassSessionModule),
  ],
  controllers: [ClassController],
  providers: [ClassService, ...Resolvers],
  exports: [ClassService],
})
export class ClassModule {}
