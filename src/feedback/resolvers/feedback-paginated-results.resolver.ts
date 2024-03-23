import { Resolver, Query, Args } from '@nestjs/graphql';
import { FeedbackService } from '../feedback.service';
import { FeedbackQueryArg } from '../args';
import { FeedbackQueryPaginatedResults } from '../models';

@Resolver(() => FeedbackQueryPaginatedResults)
export class FeedbackQueryPaginatedResultsResolver {
  constructor(
    private readonly feedbackService: FeedbackService,
  ) {}

  @Query(() => FeedbackQueryPaginatedResults, { name: 'feedbacks'})
  async getFeedbacksAndTotalCount(@Args() filters: FeedbackQueryArg) {
    return this.feedbackService.getAllFeedbacks(filters);
  }
}
