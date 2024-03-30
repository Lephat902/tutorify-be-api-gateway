import { ObjectType } from '@nestjs/graphql';
import { Feedback } from './feedback.model';
import { PaginatedResults } from 'src/common/graphql';

@ObjectType()
export class FeedbackQueryPaginatedResults extends PaginatedResults(Feedback) { }