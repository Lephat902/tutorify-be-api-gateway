import { ObjectType } from '@nestjs/graphql';
import { Class } from './class.model';
import { PaginatedResults } from 'src/common/graphql';

@ObjectType()
export class ClassPaginatedResults extends PaginatedResults(Class) { }