import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Feedback } from '../models/feedback.model';
import { AuthService } from '../../auth/auth.service';
import { Tutor, User } from '../../auth/models';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ResolveField('user', () => User, {
    description: 'Full User information, based on userId',
  })
  async getStudent(
    @Parent() feedback: Feedback,
  ) {
    const { userId } = feedback;
    const user = this.authService.getUserById(userId);
    return user;
  } 

  @ResolveField('tutor', () => Tutor, {
    description: 'Full Tutor information, based on tutorId',
  })
  async getTutor(
    @Parent() feedback: Feedback,
  ) {
    const { tutorId } = feedback;
    console.log("tutor Id ", tutorId);
    const tutor = this.authService.getUserById(tutorId);
    return tutor;
  } 
}
