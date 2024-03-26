import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { Tutor } from 'src/auth/models';
import { ClassCategory } from 'src/class-category/models';

@ObjectType()
export class TutorQuery extends OmitType(Tutor, ['phoneNumber', 'role'] as const) { 
    @Field(() => [ClassCategory])
    proficiencies: ClassCategory[];
}