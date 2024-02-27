import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Gender, UserRole } from '@tutorify/shared';

registerEnumType(Gender, {
    name: 'Gender',
});

registerEnumType(UserRole, {
    name: 'UserRole',
});

@ObjectType()
export class User {
    @Field(type => ID)
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

    @Field()
    imgUrl: string;

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