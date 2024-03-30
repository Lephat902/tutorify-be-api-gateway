import { ObjectType } from '@nestjs/graphql';
import { TutorQuery } from './tutor-query.model';
import { PaginatedResults } from 'src/common/graphql';

@ObjectType()
export class TutorQueryPaginatedResults extends PaginatedResults(TutorQuery) { }