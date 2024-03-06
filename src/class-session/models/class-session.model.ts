import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ClassSessionMaterial } from './class-session-material.model';

@ObjectType()
export class ClassSession {
  @Field((type) => ID)
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

  @Field(() => [ClassSessionMaterial])
  materials: ClassSessionMaterial[];

  @Field()
  tutorFeedback: string;
}
