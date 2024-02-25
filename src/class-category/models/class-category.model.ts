import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Level, Subject } from '.';

@ObjectType()
export class ClassCategory {
  @Field(type => ID)
  id: string;

  @Field()
  subject: Subject;
  
  @Field()
  level: Level;
}