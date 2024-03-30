import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SocialProfile {
  @Field()
  id: string;
  
  @Field()
  name: string;

  @Field()
  url: string;
}
