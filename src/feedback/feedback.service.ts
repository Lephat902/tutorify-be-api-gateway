import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FeedbackDto, FeedbackReplyDto } from './dtos';
import { QueueNames, UserMakeRequest } from '@tutorify/shared';
import { FeedbackQueryArg } from './args';

@Injectable()
export class FeedbackService {
  constructor(
    @Inject(QueueNames.FEEDBACK) private readonly client: ClientProxy,
  ) { }

  async getAllFeedbacks(filters: FeedbackQueryArg) {
    const res = await firstValueFrom(this.client.send({ cmd: 'getAllFeedbacks' }, filters));
    console.log(res);
    return res;
  }

  async getFeedbacksByTutorId(tutorId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'getFeedbacksByTutorId' }, tutorId),
    );
  }
  async createFeedback(
    tutorId: string,
    userId: string,
    feedback: FeedbackDto,
  ) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'createFeedback' },
        { tutorId, userId, ...feedback },
      ),
    );
  }

  async createFeedbackReply(
    feedbackId: string,
    userId: string,
    feedbackReply: FeedbackReplyDto,
  ) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'createFeedbackReply' },
        {
          feedbackId,
          feedbackReply: {
            userId,
            ...feedbackReply,
          },
        },
      ),
    );
  }

  async deleteFeedback(
    userMakeRequest: UserMakeRequest,
    feedbackId: string,
  ) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'deleteFeedback' },
        { userMakeRequest, feedbackId },
      ),
    );
  }

  async getFeedbackRepliesByFeedbackId(feedbackId: string) {
    return firstValueFrom(
      this.client.send(
        {
          cmd: 'getFeedbackRepliesByFeedback',
        },
        feedbackId,
      ),
    );
  }
}
