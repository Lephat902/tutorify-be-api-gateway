import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType({ implements: User })
export class Student extends User {
  @Field({ nullable: true })
  parentEmail: string;

  @Field({ nullable: true })
  parentFirstName: string;

  @Field({ nullable: true })
  parentMiddleName: string;

  @Field({ nullable: true })
  parentLastName: string;
}
