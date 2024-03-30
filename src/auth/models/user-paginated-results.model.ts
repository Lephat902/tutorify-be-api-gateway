import { ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { PaginatedResults } from 'src/common/graphql';

@ObjectType()
export class UserPaginatedResults extends PaginatedResults(User) { }