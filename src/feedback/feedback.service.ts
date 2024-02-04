import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { FeedbackDto, FeedbackReplyDto } from './dtos';

@Injectable()
export class FeedbackService {
  constructor(
    @Inject('FEEDBACK_SERVICE') private readonly client: ClientProxy,
  ) { }

  async getAllFeedbacks() {
    return firstValueFrom(this.client.send({ cmd: 'getAllFeedbacks' }, {}));
  }

  async getFeedbacksByTutorId(tutorId: string) {
    return  firstValueFrom(this.client.send({ cmd: 'getFeedbacksByTutorId' }, tutorId));
  }
  async createFeedback(tutorId: string, feedback: FeedbackDto) {
    return firstValueFrom(this.client.send({ cmd: 'createFeedback' },{tutorId, ...feedback} ));
}

  async createFeedbackReply(feedbackId: string, feedbackReply: FeedbackReplyDto) {
    return firstValueFrom(this.client.send({ cmd: 'createFeedbackReply' }, {
      feedbackId,
        feedbackReply
    }));
  }

  async getFeedbackRepliesByFeedbackId(feedbackId: string) {
    return firstValueFrom(this.client.send({
      cmd:'getFeedbackRepliesByFeedback', 
    },feedbackId))
  }
}
