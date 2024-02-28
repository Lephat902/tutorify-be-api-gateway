import { ArgsType, Field, OmitType, registerEnumType } from "@nestjs/graphql";
import { TutorOrderBy } from "@tutorify/shared";
import { IsBoolean, IsOptional } from "class-validator";
import { UserArgs } from "src/auth/args";
import { ToBoolean } from "src/common/decorators";

registerEnumType(TutorOrderBy, {
    name: 'TutorOrderBy',
});

@ArgsType()
export class TutorArgs extends OmitType(UserArgs, [
    'role',
] as const,
) {
    @IsOptional()
    @IsBoolean()
    @ToBoolean()
    @Field({
        nullable: true,
        description: 'Whether or not include not approved tutors',
        defaultValue: false,
    })
    includeNotApproved?: boolean;

    @IsOptional()
    @Field(() => TutorOrderBy, {
        nullable: true,
        description: 'Order attribute of user',
    })
    order?: TutorOrderBy;
}