import { Module, forwardRef } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { ProxiesModule } from '@tutorify/shared';
import { ClassPaginatedResultsResolver, ClassResolver } from './resolvers';
import { TutorApplyForClassModule } from 'src/tutor-apply-for-class/tutor-apply-for-class.module';
import { TutorQueryModule } from 'src/tutor-query/tutor-query.module';
import { ClassSessionModule } from 'src/class-session/class-session.module';

@Module({
  imports: [
    ProxiesModule,
    forwardRef(() => TutorApplyForClassModule),
    TutorQueryModule,
    forwardRef(() => ClassSessionModule),
  ],
  controllers: [ClassController],
  providers: [ClassService, ClassResolver, ClassPaginatedResultsResolver],
  exports: [ClassService],
})
export class ClassModule {}
