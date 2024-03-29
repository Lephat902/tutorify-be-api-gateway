import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { ClassSession } from '../models';
import { ClassService } from 'src/class/class.service';
import { AuthService } from 'src/auth/auth.service';
import { Class } from 'src/class/models';
import { Student } from 'src/auth/models';
import { TutorQueryService } from 'src/tutor-query/tutor-query.service';
import { TutorQuery } from 'src/tutor-query/models';

@Resolver(() => ClassSession)
@UseGuards(TokenGuard)
export class ShortClassResolver {
  constructor(
    private readonly classService: ClassService,
    private readonly authService: AuthService,
    private readonly tutorQueryService: TutorQueryService,
  ) { }

  @ResolveField('class', () => Class, {
    nullable: true,
    description: 'Full class information, based on classId',
  })
  async getClass(
    @Parent() classSession: ClassSession,
  ) {
    const classId = classSession.class.classId;
    return this.classService.getClassById(classId);
  }

  @ResolveField('student', () => Student, {
    nullable: true,
    description: 'Full student information, based on studentId',
  })
  async getStudent(
    @Parent() classSession: ClassSession,
  ) {
    const studentId = classSession.class.studentId;
    return this.authService.getUserById(studentId);
  }

  @ResolveField('tutor', () => TutorQuery, {
    nullable: true,
    description: 'Full tutor information, based on tutorId',
  })
  async getTutor(
    @Parent() classSession: ClassSession,
  ) {
    const tutorId = classSession.class.tutorId;
    return this.tutorQueryService.getTutorById(tutorId);
  }
}
