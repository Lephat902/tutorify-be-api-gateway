import {
  Controller,
  Post,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { TutorApplyForClassService } from './tutor-apply-for-class.service';
import { TokenRequirements, Token } from 'src/auth/decorators';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/guards';
import { ApplicationStatus, UserRole } from '@tutorify/shared';
import { TutorApplyForClass } from './models';
import { ProcessApplicationDto } from './dtos';
import { Builder } from 'builder-pattern';

@Controller('classes')
@ApiTags('Class Application')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class TutorApplyForClassController {
  constructor(
    private readonly tutorApplyForClassService: TutorApplyForClassService,
  ) { }

  @ApiOperation({ summary: 'Tutor applies for a class by its id.' })
  @Post('/:classId/apply')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async applyForClass(
    @Token() token: IAccessToken,
    @Param('classId') classId: string,
  ): Promise<TutorApplyForClass> {
    const tutorId = token.id;
    return this.tutorApplyForClassService.applyForClass(tutorId, classId);
  }

  @ApiOperation({ summary: 'Tutor cancels an application by its id.' })
  @Patch('/applications/:applicationId/cancel')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async cancelApplication(
    @Token() token: IAccessToken,
    @Param('applicationId') applicationId: string,
  ) {
    return this.processApplication(applicationId, ApplicationStatus.CANCELLED, token);
  }

  @ApiOperation({
    summary:
      `Tutor accepts an invite to teach a class OR
      Student approves an tutor application to his class,
      set all other PENDING applications' status to FILLED`,
  })
  @Patch('/applications/:applicationId/approve')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR, UserRole.STUDENT])
  async approveTutoringInvite(
    @Token() token: IAccessToken,
    @Param('applicationId') applicationId: string,
  ) {
    return this.processApplication(applicationId, ApplicationStatus.APPROVED, token);
  }

  @ApiOperation({
    summary:
      `Tutor rejects an tutoring invite OR
      Student rejects an tutor application to his class.`,
  })
  @Patch('/applications/:applicationId/reject')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR, UserRole.STUDENT])
  async rejectApplication(
    @Token() token: IAccessToken,
    @Param('applicationId') applicationId: string,
  ) {
    return this.processApplication(applicationId, ApplicationStatus.REJECTED, token);
  }

  private processApplication(applicationId: string, newStatus: ApplicationStatus, token: IAccessToken) {
    const userRole = token.roles[0];
    const processApplicationDto = Builder<ProcessApplicationDto>()
      .applicationId(applicationId)
      .newStatus(newStatus)
      .userId(token.id)
      .isStudent(userRole === UserRole.STUDENT)
      .isTutor(userRole === UserRole.TUTOR)
      .build();
    return this.tutorApplyForClassService.processApplication(processApplicationDto);
  }
}
