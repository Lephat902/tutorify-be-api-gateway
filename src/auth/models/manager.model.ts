import { ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType({ implements: User })
export class Manager extends User { }