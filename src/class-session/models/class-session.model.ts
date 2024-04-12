import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ClassSessionStatus } from '@tutorify/shared';
import { FileObject } from 'src/common/graphql';
import { ShortClass } from './short-class.model';

registerEnumType(ClassSessionStatus, {
  name: 'ClassSessionStatus',
});

@ObjectType()
export class ClassSession {
  @Field(() => ID)
  id: string;

  @Field()
  class: ShortClass;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  isCancelled: boolean;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  startDatetime: Date;

  @Field({ nullable: true })
  endDatetime: Date;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  wardId: string;

  @Field({ nullable: true })
  isOnline: boolean;

  @Field(() => [FileObject], { nullable: true })
  materials: FileObject[];

  @Field({ nullable: true })
  tutorFeedback: string;

  @Field({ nullable: true })
  feedbackUpdatedAt: Date;

  @Field(() => ClassSessionStatus, { nullable: true })
  status: ClassSessionStatus;
}
