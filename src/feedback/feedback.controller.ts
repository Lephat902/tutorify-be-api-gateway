import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { FeedbackDto, FeedbackReplyDto } from './dtos';
import { TokenGuard } from 'src/auth/guards';
import { TokenRequirements, Token } from 'src/auth/decorators';
import { IAccessToken, TokenType } from '../auth/auth.interfaces';
import { UserRole } from '@tutorify/shared';

@Controller()
@ApiTags('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('feedbacks')
  @ApiOperation({ summary: 'Get all feedbacks.' })
  async getFeedbacks() {
    return this.feedbackService.getAllFeedbacks();
  }

  @Get('tutors/:id/feedbacks')
  @ApiOperation({ summary: 'Get all feedbacks of a tutor.' })
  async getFeedbacksByTutorId(@Param('id') tutorId: string) {
    return this.feedbackService.getFeedbacksByTutorId(tutorId);
  }

  @Get('feedbacks/:id/feedback-replies')
  @ApiOperation({ summary: 'Get all feedback replies of a feedback.' })
  async getFeedbackRepliesByFeedback(@Param('id') feedbackId: string) {
    return this.feedbackService.getFeedbackRepliesByFeedbackId(feedbackId);
  }

  @Post('tutors/:id/feedbacks')
  @ApiOperation({ summary: 'Student creates a feedback for a tutor.' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
  async createFeedback(
    @Param('id') tutorId: string,
    @Body() feedback: FeedbackDto,
    @Token() token: IAccessToken,
  ) {
    const studentId = token.id;
    return this.feedbackService.createFeedback(tutorId, studentId, feedback);
  }

  @Post('feedbacks/:feedbackId/feedback-replies')
  @ApiOperation({ summary: 'Student creates a feedback reply.' })
  @ApiBearerAuth()
  @UseGuards(TokenGuard)
  @TokenRequirements(TokenType.CLIENT, [])
  async createFeedbackReply(
    @Param('feedbackId') feedbackId: string,
    @Body() feedbackReply: FeedbackReplyDto,
    @Token() token: IAccessToken,
  ) {
    const userId = token.id;
    return this.feedbackService.createFeedbackReply(
      feedbackId,
      userId,
      feedbackReply,
    );
  }
}
