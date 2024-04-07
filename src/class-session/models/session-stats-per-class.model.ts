import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SessionStatsPerClass {
  @Field({ nullable: true })
  nonCancelledClassSessionsCount: number;

  @Field({ nullable: true })
  scheduledClassSessionsCount: number;

  @Field({ nullable: true })
  totalCount: number;
}
