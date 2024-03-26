import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Tutor, User } from '../../auth/models';

@ObjectType()
export class Feedback {
  @Field(() => ID)
  id: string;
  
  @Field()
  rate: number;

  @Field()
  text: string;

  @Field(() => Tutor)
  tutor: Tutor;

  @Field(() => User)
  user: User;

  @Field()
  userId: string;

  @Field()
  tutorId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
