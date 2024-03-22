import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';
import { ClassService } from '../class.service';
import { Class } from '../models';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { TutorApplyForClass } from 'src/tutor-apply-for-class/models';
import { TutorApplyForClassService } from 'src/tutor-apply-for-class/tutor-apply-for-class.service';
import { TutorApplyForClassArgs } from 'src/tutor-apply-for-class/args';
import { Token, TokenRequirements } from 'src/auth/decorators';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import {
  SortingDirection,
  TutorApplyForClassOrderBy,
  UserRole,
} from '@tutorify/shared';
import { TutorQuery } from 'src/tutor-query/models';
import { Ward } from 'src/address/models';
import { AddressService } from 'src/address/address.service';
import { TutorQueryService } from 'src/tutor-query/tutor-query.service';
import { Student } from 'src/auth/models';
import { AuthService } from 'src/auth/auth.service';
import { ClassSessionService } from 'src/class-session/class-session.service';

@Resolver(() => Class)
@UseGuards(TokenGuard)
export class ClassResolver {
  constructor(
    private readonly classService: ClassService,
    private readonly tutorApplyForClassService: TutorApplyForClassService,
    private readonly tutorQueryService: TutorQueryService,
    private readonly addressService: AddressService,
    private readonly authService: AuthService,
    private readonly classSessionService: ClassSessionService,
  ) { }

  @Query(() => Class, { name: 'class', nullable: true })
  async getClassById(@Args('id') id: string) {
    return this.classService.getClassById(id);
  }

  @ResolveField('tutorApplications', () => [TutorApplyForClass], {
    nullable: true,
  })
  @TokenRequirements(TokenType.CLIENT, [
    UserRole.STUDENT,
    UserRole.ADMIN,
    UserRole.MANAGER,
  ])
  async getTutorApplicationsByClassId(
    @Parent() cl: Class,
    @Args() filters: TutorApplyForClassArgs,
    @Token() token: IAccessToken,
  ): Promise<TutorApplyForClass[]> {
    this.checkTutorViewPermission(cl, token);
    filters.classId = cl.id;
    return this.tutorApplyForClassService.getAllApplications(filters);
  }

  @ResolveField('tutorId', () => String, {
    nullable: true,
    description: 'Only authorized user can see tutor of the class',
  })
  @TokenRequirements(TokenType.CLIENT, [])
  async showTutorId(
    @Parent() cl: Class,
    @Token() token: IAccessToken,
  ): Promise<string> {
    this.checkTutorViewPermission(cl, token);
    return cl.tutorId;
  }

  @ResolveField('tutor', () => TutorQuery, {
    nullable: true,
    description: 'Whenever tutorId is not enough, use this field',
  })
  @TokenRequirements(TokenType.CLIENT, [
    UserRole.STUDENT,
    UserRole.ADMIN,
    UserRole.MANAGER,
  ])
  async getTutorOfClass(
    @Parent() cl: Class,
    @Token() token: IAccessToken,
  ): Promise<TutorQuery> {
    this.checkTutorViewPermission(cl, token);
    return this.tutorQueryService.getTutorById(cl.tutorId);
  }

  @ResolveField('student', () => Student, {
    nullable: true,
    description: 'Whenever studentId is not enough, use this field',
  })
  async getStudentOfClass(
    @Parent() cl: Class,
  ): Promise<Student> {
    return this.authService.getUserById(cl.studentId);
  }

  @ResolveField('lastApplication', () => TutorApplyForClass, {
    nullable: true,
    description: 'The last application of the tutor to this class',
  })
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async getLatestApplicationToClass(
    @Parent() cl: Class,
    @Token() token: IAccessToken,
  ): Promise<TutorApplyForClass> {
    const classId = cl.id;
    const tutorId = token.id;
    const applicationsToClass =
      await this.tutorApplyForClassService.getAllApplications(
        {
          classId,
          tutorId,
          page: 1,
          limit: 1,
          order: TutorApplyForClassOrderBy.APPLY_DAY,
          dir: SortingDirection.DESC,
        } as TutorApplyForClassArgs,
      );
    return applicationsToClass[0];
  }

  @ResolveField('ward', () => Ward, {
    nullable: true,
    description: 'Full ward information, based on wardId',
  })
  async getWardHierarchy(
    @Parent() cl: Class,
  ) {
    const { wardId } = cl;
    const wardHierarchy = this.addressService.getWardHierarchyById(wardId);
    return wardHierarchy;
  }

  @ResolveField('nonCancelledClassSessionsCount', () => Number, {
    nullable: true,
    description: 'Total number of class sessions of this class, excluding cancelled sessions',
  })
  async getNonCancelledClassSessionsCount(
    @Parent() cl: Class,
  ) {
    const { id } = cl;
    return this.classSessionService.getNonCancelledClassSessionsCount(id);
  }

  @ResolveField('scheduledClassSessionsCount', () => Number, {
    nullable: true,
    description: 'Total number of upcoming class sessions of this class, excluding cancelled sessions',
  })
  async getScheduledClassSessionsCount(
    @Parent() cl: Class,
  ) {
    const { id } = cl;
    return this.classSessionService.getScheduledClassSessionsCount(id);
  }

  private checkTutorViewPermission(cl: Class, token: IAccessToken) {
    const userRole = token.roles[0];
    const userId = token.id;
    const { studentId, tutorId } = cl;
    if (
      (userRole === UserRole.STUDENT && studentId !== userId) ||
      (userRole === UserRole.TUTOR && tutorId !== userId)
    ) {
      throw new ForbiddenException("None of your business");
    }
  }
}