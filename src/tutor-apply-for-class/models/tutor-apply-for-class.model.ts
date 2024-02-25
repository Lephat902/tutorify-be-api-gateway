import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApplicationStatus } from '@tutorify/shared';
import { Class } from 'src/class/models';

registerEnumType(ApplicationStatus, {
  name: 'ApplicationStatus',
});

@ObjectType()
export class TutorApplyForClass {
  @Field(type => ID)
  id: string;

  @Field()
  classId: string;

  @Field(() => Class, {
    nullable: true,
    description: 'If the classId alone does not provide sufficient information, consider using this additional field.'
  })
  class?: Class;

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