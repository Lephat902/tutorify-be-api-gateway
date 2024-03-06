import { Args, Query, Resolver } from '@nestjs/graphql';
import { Tutor } from '../models';
import { TutorArgs } from '../args';
import { TutorQueryService } from '../tutor-query.service';

@Resolver(() => Tutor)
export class TutorResolver {
  constructor(private readonly tutorQueryService: TutorQueryService) {}

  // @Query(() => Tutor, { name: 'tutor' })
  // async getTutor(@Args('id') id: string): Promise<Tutor> {
  //     return this.authService.getUserById(id);
  // }

  @Query(() => [Tutor], { name: 'tutors' })
  async getTutors(@Args() filters: TutorArgs): Promise<Tutor[]> {
    return this.tutorQueryService.getTutors(filters);
  }
}
