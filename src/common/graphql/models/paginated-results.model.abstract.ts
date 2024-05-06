import { Field, ObjectType } from '@nestjs/graphql';

export function PaginatedResults<TItem>(TItemClass: new () => TItem) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResultsClass {
    @Field(() => [TItemClass])
    results: TItem[];

    @Field()
    totalCount: number;

    @Field({ nullable: true })
    newPageIndex?: number;
  }
  return PaginatedResultsClass;
}