import { Module } from '@nestjs/common';
import { TutorQueryService } from './tutor-query.service';
import { AddressProxy, ProxiesModule } from '@tutorify/shared';
import { TutorPaginatedResultsResolver, TutorResolver } from './resolvers';

@Module({
  imports: [
    ProxiesModule,
  ],
  providers: [
    TutorQueryService,
    AddressProxy,
    TutorPaginatedResultsResolver,
    TutorResolver,
  ],
  exports: [TutorQueryService],
})
export class TutorQueryModule { }
