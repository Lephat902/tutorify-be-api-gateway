import { Resolver, Query, Args, Parent, ResolveField } from '@nestjs/graphql';
import { ClassService } from '../class.service';
import { Class } from '../models';
import { ClassQueryArgs } from '../args';
import { UseGuards } from '@nestjs/common';
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
import { AuthService } from 'src/auth/auth.service';
import { Tutor } from 'src/tutor-query/models';

@Resolver((of) => Class)
@UseGuards(TokenGuard)
export class ClassResolver {
  constructor(
    private readonly classService: ClassService,
    private readonly tutorApplyForClassService: TutorApplyForClassService,
    private readonly authService: AuthService,
  ) {}

  @Query((returns) => Class, { name: 'class' })
  async getClassById(@Args('id') id: string) {
    return this.classService.getClassById(id);
  }

  @Query((returns) => [Class], { name: 'classes' })
  async getClasses(@Args() filters: ClassQueryArgs) {
    return this.classService.getClasses(filters);
  }

  @ResolveField('tutorApplications', (returns) => [TutorApplyForClass], {
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
    const userRole = token.roles[0];
    const { id } = cl;
    if (userRole === UserRole.STUDENT) {
      this.classService.assertClassOwnership(token, id);
    }
    return this.tutorApplyForClassService.getTutorApplicationsByClassId(
      id,
      filters,
    );
  }

  @ResolveField('tutor', () => Tutor, {
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
  ): Promise<Tutor> {
    const { id, tutorId } = cl;
    const userRole = token.roles[0];
    if (userRole === UserRole.STUDENT) {
      this.classService.assertClassOwnership(token, id);
    }
    return this.authService.getUserById(tutorId);
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
    const { id } = cl;
    const userId = token.id;
    const applicationsToClass =
      await this.tutorApplyForClassService.getMyApplicationsToClass(
        id,
        userId,
        {
          page: 1,
          limit: 1,
          order: TutorApplyForClassOrderBy.APPLY_DAY,
          dir: SortingDirection.DESC,
        },
      );
    return applicationsToClass[0];
  }
}
