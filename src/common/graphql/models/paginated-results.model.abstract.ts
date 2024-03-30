import { Field, ObjectType } from '@nestjs/graphql';

export function PaginatedResults<TItem>(TItemClass: new () => TItem) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResultsClass {
    @Field(type => [TItemClass])
    results: TItem[];

    @Field()
    totalCount: number;
  }
  return PaginatedResultsClass;
}