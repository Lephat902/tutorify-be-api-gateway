import { Controller, Post, Get, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { TutorApplyForClassService } from './tutor-apply-for-class.service';
import { TutorApplyForClassDto, TutorApplyForClassQueryDto } from './dtos';
import { TokenRequirements } from 'src/auth/token-requirements.decorator';
import { IAccessToken, TokenType, UserRole } from 'src/auth/auth.interfaces';
import { Token } from 'src/auth/token.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/token.guard';
import { ClassService } from 'src/class/class.service';

@Controller('classes')
@ApiTags('Class Application')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class TutorApplyForClassController {
    constructor(
        private readonly tutorApplyForClassService: TutorApplyForClassService,
        private readonly classService: ClassService,
    ) { }

    @ApiOperation({ summary: 'Tutor applies for a class by its id.' })
    @Post('/:classId/apply')
    @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
    async applyForClass(@Token() token: IAccessToken, @Param('classId') classId: string): Promise<TutorApplyForClassDto> {
        const tutorId = token.id;
        return this.tutorApplyForClassService.applyForClass(tutorId, classId);
    }

    @ApiOperation({ summary: 'Tutor retrieves an application of his by its id.' })
    @Get('/my/applications/:applicationId')
    @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
    async getMyApplicationById(
        @Token() token: IAccessToken,
        @Param('applicationId') applicationId: string,
    ): Promise<TutorApplyForClassDto> {
        await this.tutorApplyForClassService.validateApplicationOwnership(token, applicationId);
        return this.tutorApplyForClassService.getApplicationById(applicationId);
    }

    @ApiOperation({ summary: 'Tutor retrieves all of his applications.' })
    @Get('/my/applications')
    @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
    async getMyApplicationsByTutor(
        @Token() token: IAccessToken,
        @Query() filters: TutorApplyForClassQueryDto,
    ): Promise<TutorApplyForClassDto[]> {
        const userId = token.id;
        return this.tutorApplyForClassService.getMyApplicationsByTutor(userId, filters);
    }

    @ApiOperation({ summary: 'Tutor cancels an application by its id.' })
    @Patch('/my/applications/:applicationId/cancel')
    @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
    async cancelApplication(
        @Token() token: IAccessToken,
        @Param('applicationId') applicationId: string
    ) {
        await this.tutorApplyForClassService.validateApplicationOwnership(token, applicationId);
        await this.tutorApplyForClassService.cancelApplication(applicationId);
    }

    @ApiOperation({ summary: 'Student retrieves an application to his class by its id.' })
    @Get('/applications/:applicationId')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    async getApplicationById(
        @Token() token: IAccessToken,
        @Param('applicationId') applicationId: string,
    ): Promise<TutorApplyForClassDto> {
        const application = await this.tutorApplyForClassService.getApplicationById(applicationId);
        const classId = application.classId;
        await this.classService.validateClassOwnership(token, classId);
        return this.tutorApplyForClassService.getApplicationById(applicationId);
    }

    @ApiOperation({ summary: 'Student retrieves all tutor applications to his class.' })
    @Get('/:classId/applications')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    async getTutorApplicationsByClassId(
        @Token() token: IAccessToken,
        @Param('classId') classId: string,
        @Query() filters: TutorApplyForClassQueryDto,
    ): Promise<TutorApplyForClassDto[]> {
        await this.classService.validateClassOwnership(token, classId);
        return this.tutorApplyForClassService.getTutorApplicationsByClassId(classId, filters);
    }

    @ApiOperation({ summary: 'Student rejects an tutor application to his class.' })
    @Patch('/applications/:applicationId/reject')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    async rejectApplication(
        @Token() token: IAccessToken,
        @Param('applicationId') applicationId: string
    ) {
        const applicationToReject = await this.tutorApplyForClassService.getApplicationById(applicationId);
        const classId = applicationToReject.classId;
        await this.classService.validateClassOwnership(token, classId);
        await this.tutorApplyForClassService.rejectApplication(applicationId);
    }

    @ApiOperation({ summary: "Student approves an tutor application to his class, set all other pending applications' status to FILLED" })
    @Patch('/applications/:applicationId/approve')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    async approveApplication(
        @Token() token: IAccessToken,
        @Param('applicationId') applicationId: string
    ) {
        const applicationToApprove = await this.tutorApplyForClassService.getApplicationById(applicationId);
        const classId = applicationToApprove.classId;
        await this.classService.validateClassOwnership(token, classId);
        await this.tutorApplyForClassService.approveApplication(applicationId);
    }
}
