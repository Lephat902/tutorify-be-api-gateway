import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { TutorApplyForClassArgs } from '../args';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { TutorApplyForClassService } from '../tutor-apply-for-class.service';
import { TutorApplyForClass } from '../models';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { Token, TokenRequirements } from 'src/auth/decorators';
import { UserRole } from '@tutorify/shared';
import { ClassService } from 'src/class/class.service';
import { Class } from 'src/class/models';

@Resolver(of => TutorApplyForClass)
@UseGuards(TokenGuard)
export class TutorApplyForClassResolver {
    constructor(
        private readonly tutorApplyForClassService: TutorApplyForClassService,
        private readonly classService: ClassService,
    ) { }

    @Query(returns => TutorApplyForClass, { name: 'classApplication' })
    @TokenRequirements(TokenType.CLIENT, [])
    async getClassApplicationById(@Args('id') applicationId: string, @Token() token: IAccessToken) {
        const userRole = token.roles[0];
        const application = await this.tutorApplyForClassService.getApplicationById(applicationId);
        if (userRole === UserRole.TUTOR) {
            await this.tutorApplyForClassService.validateApplicationOwnership(token, applicationId);
        } else if (userRole === UserRole.STUDENT) {
            await this.classService.validateClassOwnership(token, application.classId);
        }

        return application;
    }

    @Query(returns => [TutorApplyForClass], { name: 'myClassApplications' })
    @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
    async getMyApplicationsByTutor(@Args() filters: TutorApplyForClassArgs, @Token() token: IAccessToken) {
        const tutorId = token.id;
        return this.tutorApplyForClassService.getMyApplications(tutorId, filters);
    }

    @ResolveField('class', () => Class, {
        nullable: true,
        description: 'If the classId alone does not provide sufficient information, consider using this additional field.'
    })
    async getClassOfApplication(
        @Parent() classApplication: TutorApplyForClass,
    ): Promise<Class> {
        const { classId } = classApplication;
        return this.classService.getClassById(classId);
    }
}