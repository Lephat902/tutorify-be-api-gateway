import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Level, Subject } from '.';

@ObjectType()
export class ClassCategory {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  slug: string;

  @Field()
  subject: Subject;

  @Field()
  level: Level;

  @Field({
    description: 'Set `includeClassCount` arg to true to use this field',
    nullable: true,
    defaultValue: 0,
  })
  classCount: number;

  @Field({
    description: 'Set `includeTutorCount` arg to true to use this field',
    nullable: true,
    defaultValue: 0,
  })
  tutorCount: number;
}
