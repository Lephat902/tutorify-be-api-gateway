import { ObjectType } from '@nestjs/graphql';
import { PaginatedResults } from 'src/common/graphql';
import { ShortClass } from './short-class.model';

@ObjectType()
export class ShortClassPaginatedResults extends PaginatedResults(ShortClass) { }