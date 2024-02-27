import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TutorPortfolio {
    @Field()
    id: string;

    @Field()
    url: string;

    @Field()
    title: string;

    @Field()
    size: number;
}
