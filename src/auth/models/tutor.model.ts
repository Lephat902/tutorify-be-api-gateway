import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { ClassCategory } from 'src/class-category/models';
import { FileObject } from 'src/common/graphql';

@ObjectType({ implements: User })
export class Tutor extends User {
  @Field()
  biography: string;

  @Field()
  isApproved: boolean;

  @Field({ nullable: true })
  approvedAt: Date;

  @Field()
  minimumWage: number;

  @Field()
  currentWorkplace: string;

  @Field()
  currentPosition: string;

  @Field()
  major: string;

  @Field({ nullable: true })
  graduationYear: number;

  @Field(() => [FileObject])
  tutorPortfolios: FileObject[];

  @Field(() => [ClassCategory])
  proficiencies: ClassCategory[];

  @Field(() => [String])
  socialProfiles: string[];

  @Field({ nullable: true })
  numOfClasses: number;

  @Field({ nullable: true })
  feedbackCount: number;

  @Field({ nullable: true })
  totalFeedbackRating: number;
}
