import {  Controller, Get, Post, Param, Body} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { FeedbackService } from './feedback.service'
import { FeedbackDto, FeedbackReplyDto } from './dtos';


@Controller()
@ApiTags('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Get('feedbacks')
  @ApiOperation({ summary: 'Get all feedbacks.' })
  async getFeedbacks(
  ) {
    return this.feedbackService.getAllFeedbacks();
  }

  @Get('tutors/:id/feedbacks')
  @ApiOperation({ summary: 'Get all feedbacks of a tutor.' })
  async getFeedbacksByTutorId(
    @Param('id') tutorId: string
  ) {
    return this.feedbackService.getFeedbacksByTutorId(tutorId);
  }

  @Get('feedbacks/:id/feedback-replies')
  @ApiOperation({ summary: 'Get all feedback replies of a feedback.' })
  async getFeedbackRepliesByFeedback(
    @Param('id') feedbackId: string
  ) {
    return this.feedbackService.getFeedbackRepliesByFeedbackId(feedbackId);
  }

  @Post('tutors/:id/feedbacks')
  @ApiOperation({ summary: 'Student creates a feedback for a tutor.' })
  async createFeedback(
    @Param('id') tutorId: string,
    @Body() feedback: FeedbackDto,
  ) {
    return this.feedbackService.createFeedback(tutorId, feedback);
  }

  @Post('feedbacks/:feedbackId/feedback-replies')
  @ApiOperation({ summary: 'Student creates a feedback reply.' })
  async createFeedbackReply(
    @Param('feedbackId') feedbackId: string,
    @Body() feedbackReply: FeedbackReplyDto,
  ) {
    return this.feedbackService.createFeedbackReply(feedbackId, feedbackReply);
  }
}
