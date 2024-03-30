import { ObjectType } from '@nestjs/graphql';
import { ClassSession } from './class-session.model';
import { PaginatedResults } from 'src/common/graphql';

@ObjectType()
export class ClassSessionPaginatedResults extends PaginatedResults(ClassSession) { }