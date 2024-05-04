import { Field, HideField, ObjectType, OmitType } from '@nestjs/graphql';
import { StoredLocation } from '@tutorify/shared';
import { Tutor } from 'src/auth/models';
import { ClassCategory } from 'src/class-category/models';

@ObjectType()
export class TutorQuery extends OmitType(Tutor, ['phoneNumber', 'role'] as const) {
    @Field(() => [ClassCategory])
    proficiencies: ClassCategory[];

    @Field({ nullable: true })
    numOfClasses: number;

    @Field({ nullable: true })
    feedbackCount: number;

    @Field({ nullable: true })
    totalFeedbackRating: number;

    @HideField()
    location: StoredLocation;
}