import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { TutorApplyForClassArgs } from '../args';
import { BadRequestException, ForbiddenException, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { TutorApplyForClassService } from '../tutor-apply-for-class.service';
import { TutorApplyForClass } from '../models';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { Token, TokenRequirements } from 'src/auth/decorators';
import { UserRole } from '@tutorify/shared';
import { ClassService } from 'src/class/class.service';
import { Class } from 'src/class/models';
import { TutorQuery } from 'src/tutor-query/models';
import { TutorQueryService } from 'src/tutor-query/tutor-query.service';

@Resolver(() => TutorApplyForClass)
@UseGuards(TokenGuard)
export class TutorApplyForClassResolver {
  constructor(
    private readonly tutorApplyForClassService: TutorApplyForClassService,
    private readonly classService: ClassService,
    private readonly tutorQueryService: TutorQueryService,
  ) { }

  @Query(() => TutorApplyForClass, { name: 'classApplication' })
  @TokenRequirements(TokenType.CLIENT, [])
  async getClassApplicationById(
    @Args('id') applicationId: string,
    @Token() token: IAccessToken,
  ) {
    const userRole = token.roles[0];
    const application =
      await this.tutorApplyForClassService.getApplicationById(applicationId);

    if (userRole === UserRole.TUTOR && application.tutorId !== token.id) {
      throw new ForbiddenException("None of your business");
    } else if (userRole === UserRole.STUDENT) {
      await this.classService.assertClassOwnership(token, application.classId);
    }

    return application;
  }

  @Query(() => [TutorApplyForClass], { name: 'classApplications' })
  @TokenRequirements(TokenType.CLIENT, [])
  async getAllApplications(
    @Args() filters: TutorApplyForClassArgs,
    @Token() token: IAccessToken,
  ) {
    const userRole = token.roles[0];
    if (userRole === UserRole.TUTOR) {
      filters.tutorId = token.id;
    } else if (userRole === UserRole.STUDENT) {
      if (!filters.classId)
        throw new BadRequestException("ClassId is required for requests made by user with STUDENT role");
      await this.classService.assertClassOwnership(token, filters.classId);
    }
    return this.tutorApplyForClassService.getAllApplications(filters);
  }

  @ResolveField('class', () => Class, {
    nullable: true,
    description:
      'If the classId alone does not provide sufficient information, consider using this additional field.',
  })
  async getClassOfApplication(
    @Parent() classApplication: TutorApplyForClass,
  ): Promise<Class> {
    const { classId } = classApplication;
    return this.classService.getClassById(classId);
  }

  @ResolveField('tutor', () => TutorQuery, {
    nullable: true,
    description:
      'If the tutorId alone does not provide sufficient information, consider using this additional field.',
  })
  async getTutorOfApplication(
    @Parent() classApplication: TutorApplyForClass,
  ): Promise<TutorQuery> {
    const { tutorId } = classApplication;
    return this.tutorQueryService.getTutorById(tutorId);
  }
}
