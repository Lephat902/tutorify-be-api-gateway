import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GenderPref, TutorPositionPref } from '@tutorify/shared';
import { ClassTimeSlot } from './class-timeslot.model';
import { ClassCategory } from 'src/class-category/models';

registerEnumType(GenderPref, {
  name: 'GenderPref',
});

registerEnumType(TutorPositionPref, {
  name: 'TutorPositionPref',
});

@ObjectType()
export class Class {
  @Field((type) => ID)
  id: string;

  @Field()
  studentId: string;

  @Field({ nullable: true })
  tutorId: string;

  @Field(() => [ClassCategory])
  classCategories: ClassCategory[];

  @Field()
  description: string;

  @Field()
  requirement: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  wages?: number;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  wardId: string;

  @Field()
  isOnline: boolean;

  @Field()
  studentQty: number;

  @Field(() => TutorPositionPref, { nullable: true })
  tutorPositionPref: TutorPositionPref;

  @Field(() => GenderPref)
  tutorGenderPref: GenderPref;

  @Field(() => [ClassTimeSlot])
  timeSlots: ClassTimeSlot[];
}
