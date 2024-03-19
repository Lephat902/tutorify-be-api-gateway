import { Resolver, Query, Args } from '@nestjs/graphql';
import { TutorQueryService } from '../tutor-query.service';
import { TutorQuery } from '../models';

@Resolver(() => TutorQuery)
export class TutorResolver {
  constructor(
    private readonly tutorQueryService: TutorQueryService,
  ) {}

  @Query(() => TutorQuery, { name: 'tutor', nullable: true })
  async getTutorsAndTotalCount(@Args('id') id: string) {
    return this.tutorQueryService.getTutorById(id);
  }
}
