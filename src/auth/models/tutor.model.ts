import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { FileObject } from 'src/common/graphql';
import { SocialProfile } from './social-profile.model';

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

  @Field(() => [SocialProfile], {nullable: true})
  socialProfiles: SocialProfile[];
}
