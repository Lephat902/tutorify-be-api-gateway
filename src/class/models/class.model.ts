import { Field, HideField, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ClassStatus, GenderPref, StoredLocation, TutorPositionPref } from '@tutorify/shared';
import { ClassTimeSlot } from './class-timeslot.model';
import { ClassCategory } from 'src/class-category/models';

registerEnumType(GenderPref, {
  name: 'GenderPref',
});

registerEnumType(TutorPositionPref, {
  name: 'TutorPositionPref',
});

registerEnumType(ClassStatus, {
  name: 'ClassStatus',
});

@ObjectType()
export class Class {
  @Field(() => ID)
  id: string;

  @Field()
  studentId: string;

  @HideField()
  tutorId: string;

  @Field(() => ClassStatus)
  status: ClassStatus;

  @Field(() => [ClassCategory])
  classCategories: ClassCategory[];

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  isHidden: boolean;

  @Field({ nullable: true })
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

  @Field({ nullable: true })
  isOnline: boolean;

  @Field({ nullable: true })
  studentQty: number;

  @Field(() => TutorPositionPref)
  tutorPositionPref: TutorPositionPref;

  @Field(() => GenderPref)
  tutorGenderPref: GenderPref;

  @Field(() => [ClassTimeSlot])
  timeSlots: ClassTimeSlot[];

  @Field({ nullable: true })
  imgUrl: string;

  @HideField()
  location: StoredLocation;
}
