import { Field, ID, InterfaceType, registerEnumType } from '@nestjs/graphql';
import { Gender, UserRole } from '@tutorify/shared';
import { FileObject } from 'src/common/graphql';
import { Student, Admin, Manager, Tutor } from '.';

registerEnumType(Gender, {
  name: 'Gender',
});

registerEnumType(UserRole, {
  name: 'UserRole',
});

@InterfaceType({
  isAbstract: true,
  resolveType(user: User) {
    switch (user.role) {
      case UserRole.STUDENT:
        return Student;
      case UserRole.TUTOR:
        return Tutor;
      case UserRole.ADMIN:
        return Admin;
      case UserRole.MANAGER:
        return Manager;
      default:
        return Admin;
    }
  },
})
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
