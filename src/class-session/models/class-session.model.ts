import { Field, ID, ObjectType } from '@nestjs/graphql';
import { FileObject } from 'src/common/graphql';

@ObjectType()
export class ClassSession {
  @Field(() => ID)
  id: string;

  @Field()
  classId: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  title: string;

  @Field()
  isCancelled: boolean;

  @Field()
  createdAt: Date;

  @Field()
  startDatetime: Date;

  @Field()
  endDatetime: Date;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  wardId: string;

  @Field()
  isOnline: boolean;

  @Field(() => [FileObject])
  materials: FileObject[];

  @Field()
  tutorFeedback: string;
}
