import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Gender, UserRole } from '@tutorify/shared';
import { FileObject } from 'src/common/graphql';

registerEnumType(Gender, {
  name: 'Gender',
});

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  firstName: string;

  @Field()
  middleName: string;

  @Field()
  lastName: string;

  @Field(() => Gender, { nullable: true })
  gender: Gender;

  @Field()
  phoneNumber: string;

  @Field(() => FileObject, { nullable: true })
  avatar: FileObject;

  @Field(() => UserRole)
  role: UserRole;

  @Field()
  emailVerified: boolean;

  @Field()
  isBlocked: boolean;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  wardId: string;
}
