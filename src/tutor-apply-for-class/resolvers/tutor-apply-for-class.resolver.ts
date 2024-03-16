import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { TutorApplyForClassArgs } from '../args';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { TutorApplyForClassService } from '../tutor-apply-for-class.service';
import { TutorApplyForClass } from '../models';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { Token, TokenRequirements } from 'src/auth/decorators';
import { UserRole } from '@tutorify/shared';
import { ClassService } from 'src/class/class.service';
import { Class } from 'src/class/models';

@Resolver(() => TutorApplyForClass)
@UseGuards(TokenGuard)
export class TutorApplyForClassResolver {
  constructor(
    private readonly tutorApplyForClassService: TutorApplyForClassService,
    private readonly classService: ClassService,
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
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR, UserRole.MANAGER, UserRole.ADMIN])
  async getAllApplications(
    @Args() filters: TutorApplyForClassArgs,
    @Token() token: IAccessToken,
  ) {
    const userRole = token.roles[0];
    if (userRole === UserRole.TUTOR) {
      filters.tutorId = token.id;
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
}
