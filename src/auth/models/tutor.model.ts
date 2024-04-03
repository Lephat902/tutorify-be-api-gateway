import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { FileObject } from 'src/common/graphql';
import { SocialProfile } from './social-profile.model';

@ObjectType({ implements: User })
export class Tutor extends User {
  @Field({ nullable: true })
  biography: string;

  @Field({ nullable: true })
  isApproved: boolean;

  @Field({ nullable: true })
  approvedAt: Date;

  @Field({ nullable: true })
  minimumWage: number;

  @Field({ nullable: true })
  currentWorkplace: string;

  @Field({ nullable: true })
  currentPosition: string;

  @Field({ nullable: true })
  major: string;

  @Field({ nullable: true })
  graduationYear: number;

  @Field(() => [FileObject], { nullable: true })
  tutorPortfolios: FileObject[];

  @Field(() => [SocialProfile], { nullable: true })
  socialProfiles: SocialProfile[];
}
