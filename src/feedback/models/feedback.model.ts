import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Student, Tutor } from '../../auth/models';

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

  @Field(() => Student)
  student: Student;

  @Field()
  studentId: string;

  @Field()
  tutorId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
