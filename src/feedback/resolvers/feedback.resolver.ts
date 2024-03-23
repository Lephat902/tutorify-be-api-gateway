import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Feedback } from '../models/feedback.model';
import { AuthService } from '../../auth/auth.service';
import { Student, Tutor } from '../../auth/models';

@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ResolveField('student', () => Student, {
    description: 'Full Student  information, based on studentId',
  })
  async getStudent(
    @Parent() feedback: Feedback,
  ) {
    const { studentId } = feedback;
    console.log("student Id ", studentId);
    const student = this.authService.getUserById(studentId);
    return student;
  } 

  @ResolveField('tutor', () => Tutor, {
    description: 'Full Student  information, based on studentId',
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
