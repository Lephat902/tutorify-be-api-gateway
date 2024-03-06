import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClassSessionMaterial {
  @Field((type) => ID)
  id: string;

  @Field()
  url: string;

  @Field()
  title: string;

  @Field()
  size: number;

  @Field({ nullable: true })
  description: string;
}
