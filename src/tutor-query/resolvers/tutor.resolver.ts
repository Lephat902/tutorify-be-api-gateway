import { Resolver, Query, Args } from '@nestjs/graphql';
import { TutorQueryService } from '../tutor-query.service';
import { Tutor } from '../models';

@Resolver(() => Tutor)
export class TutorResolver {
  constructor(
    private readonly tutorService: TutorQueryService,
  ) {}

  @Query(() => Tutor, { name: 'tutor', nullable: true })
  async getTutorsAndTotalCount(@Args('id') id: string) {
    return this.tutorService.getTutorById(id);
  }
}
