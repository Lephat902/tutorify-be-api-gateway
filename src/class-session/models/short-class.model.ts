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