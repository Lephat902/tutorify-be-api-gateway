import { Field, ObjectType, OmitType, registerEnumType } from '@nestjs/graphql';
import { Gender, UserRole } from '@tutorify/shared';
import { User } from 'src/auth/models';
import { ClassCategory } from 'src/class-category/models';
import { FileObject } from 'src/common/graphql';

registerEnumType(Gender, {
  name: 'Gender',
});

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
export class Tutor extends OmitType(User, ['phoneNumber', 'role'] as const) {
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
}
