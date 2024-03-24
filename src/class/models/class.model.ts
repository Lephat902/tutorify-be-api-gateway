import { Field, HideField, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
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
  @Field(() => ID)
  id: string;

  @Field()
  studentId: string;

  @HideField()
  tutorId: string;

  @Field(() => [ClassCategory])
  classCategories: ClassCategory[];

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;

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

  @Field({ nullable: true })
  imgUrl: string;
}
