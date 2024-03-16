import {
  Controller,
  Post,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { TutorApplyForClassService } from './tutor-apply-for-class.service';
import { TutorApplyForClassDto } from './dtos';
import { TokenRequirements, Token } from 'src/auth/decorators';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/guards';
import { ClassService } from 'src/class/class.service';
import { UserRole } from '@tutorify/shared';

@Controller('classes')
@ApiTags('Class Application')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class TutorApplyForClassController {
  constructor(
    private readonly tutorApplyForClassService: TutorApplyForClassService,
    private readonly classService: ClassService,
  ) {}

  @ApiOperation({ summary: 'Tutor applies for a class by its id.' })
  @Post('/:classId/apply')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async applyForClass(
    @Token() token: IAccessToken,
    @Param('classId') classId: string,
  ): Promise<TutorApplyForClassDto> {
    const tutorId = token.id;
    return this.tutorApplyForClassService.applyForClass(tutorId, classId);
  }

  @ApiOperation({ summary: 'Tutor cancels an application by its id.' })
  @Patch('/my/applications/:applicationId/cancel')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async cancelApplication(
    @Token() token: IAccessToken,
    @Param('applicationId') applicationId: string,
  ) {
    await this.tutorApplyForClassService.validateApplicationOwnership(
      token,
      applicationId,
    );
    await this.tutorApplyForClassService.cancelApplication(applicationId);
  }

  @ApiOperation({
    summary:
      "Tutor accept an invite to teach a class, set all other pending applications' status to FILLED",
  })
  @Patch('/my/applications/:applicationId/approve')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async approveTutoringInvite(
    @Token() token: IAccessToken,
    @Param('applicationId') applicationId: string,
  ) {
    await this.tutorApplyForClassService.validateApplicationOwnership(
      token,
      applicationId,
    );
    await this.tutorApplyForClassService.approveApplication(applicationId);
  }

  @ApiOperation({
    summary: 'Student rejects an tutor application to his class.',
  })
  @Patch('/applications/:applicationId/reject')
  @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
  async rejectApplication(
    @Token() token: IAccessToken,
    @Param('applicationId') applicationId: string,
  ) {
    const applicationToReject =
      await this.tutorApplyForClassService.getApplicationById(applicationId);
    const classId = applicationToReject.classId;
    await this.classService.assertClassOwnership(token, classId);
    await this.tutorApplyForClassService.rejectApplication(applicationId);
  }

  @ApiOperation({
    summary:
      "Student approves an tutor application to his class, set all other pending applications' status to FILLED",
  })
  @Patch('/applications/:applicationId/approve')
  @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
  async approveApplication(
    @Token() token: IAccessToken,
    @Param('applicationId') applicationId: string,
  ) {
    const applicationToApprove =
      await this.tutorApplyForClassService.getApplicationById(applicationId);
    const classId = applicationToApprove.classId;
    await this.classService.assertClassOwnership(token, classId);
    await this.tutorApplyForClassService.approveApplication(applicationId);
  }
}
