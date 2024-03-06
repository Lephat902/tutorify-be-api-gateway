import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApplicationStatus } from '@tutorify/shared';

registerEnumType(ApplicationStatus, {
  name: 'ApplicationStatus',
});

@ObjectType()
export class TutorApplyForClass {
  @Field((type) => ID)
  id: string;

  @Field()
  classId: string;

  @Field()
  tutorId: string;

  @Field(() => ApplicationStatus)
  status: ApplicationStatus;

  @Field()
  isDesignated: boolean;

  @Field()
  appliedAt: Date;

  @Field({ nullable: true })
  approvedAt: Date;
}
