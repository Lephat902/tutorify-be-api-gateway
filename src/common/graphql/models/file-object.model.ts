import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileObject {
  @Field({ nullable: true })
  id: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  size: number;
}
