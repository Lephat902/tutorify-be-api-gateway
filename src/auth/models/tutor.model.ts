import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Gender, UserRole } from '@tutorify/shared';
import { User, TutorPortfolio } from '.';

registerEnumType(Gender, {
  name: 'Gender',
});

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
export class Tutor extends User {
  @Field()
  biography: string;

  @Field()
  isApproved: boolean;

  @Field({ nullable: true })
  approvedAt: Date;

  @Field()
  minimumWage: string;

  @Field()
  currentWorkplace: string;

  @Field()
  currentPosition: string;

  @Field()
  major: string;

  @Field({ nullable: true })
  graduationYear: number;

  @Field(() => [TutorPortfolio])
  tutorPortfolios: TutorPortfolio[];
}
