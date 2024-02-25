import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Weekday } from '@tutorify/shared';

registerEnumType(Weekday, {
  name: 'Weekday',
});

@ObjectType()
export class ClassTimeSlot {
  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field()
  weekday: Weekday;
}
