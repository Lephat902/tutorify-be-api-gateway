import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ClassSessionStatus } from '@tutorify/shared';
import { FileObject } from 'src/common/graphql';

registerEnumType(ClassSessionStatus, {
  name: 'ClassSessionStatus',
});

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

  @Field(() => ClassSessionStatus)
  status: ClassSessionStatus;
}
