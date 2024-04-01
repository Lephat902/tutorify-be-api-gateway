import {
  Controller,
  Post,
  UseGuards,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { ClassSessionCreateDto, ClassSessionUpdateDto } from './dtos';
import { Token, TokenRequirements } from 'src/auth/decorators';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/guards';
import { UserRole } from '@tutorify/shared';
import { ClassSessionService } from './class-session.service';

@Controller()
@ApiTags('Class Session')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class ClassSessionController {
  constructor(private readonly classSessionService: ClassSessionService) { }

  @ApiOperation({
    summary: 'Tutor creates class session(s) for a class.',
    description:
      'Tutor create at least one class, with options to create either a specific number of classes or to a specific time',
  })
  @Post('/classess/:classId/sessions')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async createClassSessions(
    @Token() token: IAccessToken,
    @Param('classId') classId: string,
    @Body() classSessionCreateDto: ClassSessionCreateDto,
  ) {
    const tutorId = token.id;

    return this.classSessionService.createClassSessions(
      tutorId,
      classId,
      classSessionCreateDto,
    );
  }

  @ApiOperation({
    summary: 'Tutor updates a class session.',
  })
  @Patch('/classess/sessions/:sessionId')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async updateClassSession(
    @Token() token: IAccessToken,
    @Param('sessionId') sessionId: string,
    @Body() classSessionUpdateDto: ClassSessionUpdateDto,
  ) {
    const tutorId = token.id;

    return this.classSessionService.updateClassSession(
      tutorId,
      sessionId,
      classSessionUpdateDto,
    );
  }

  @ApiOperation({
    summary: 'Tutor cancels a class session.',
  })
  @Patch('/classess/sessions/:classSessionId/cancel')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async cancelClassSession(
    @Token() token: IAccessToken,
    @Param('classSessionId') classSessionId: string,
  ) {
    const tutorId = token.id;

    return this.classSessionService.updateClassSession(
      tutorId,
      classSessionId,
      {
        isCancelled: true,
      } as ClassSessionUpdateDto,
    );
  }
}
