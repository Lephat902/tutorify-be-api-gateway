import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileObject {
    @Field()
    id: string;

    @Field()
    url: string;

    @Field()
    title: string;

    @Field()
    size: number;
}
