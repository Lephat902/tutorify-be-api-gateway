import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ClassSessionStatus } from '@tutorify/shared';
import { FileObject } from 'src/common/graphql';

registerEnumType(ClassSessionStatus, {
  name: 'ClassSessionStatus',
});

@ObjectType()
export class ShortClass {
  @Field(() => ID)
  classId: string;

  @Field()
  studentId: string;

  @Field()
  tutorId: string;
}

@ObjectType()
export class ClassSession {
  @Field(() => ID)
  id: string;

  @Field()
  class: ShortClass;

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

  @Field({ nullable: true })
  feedbackUpdatedAt: Date;

  @Field(() => ClassSessionStatus)
  status: ClassSessionStatus;
}
