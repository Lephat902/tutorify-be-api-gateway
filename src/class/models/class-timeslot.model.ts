import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Weekday } from '@tutorify/shared';

registerEnumType(Weekday, {
  name: 'Weekday',
});

@ObjectType()
export class ClassTimeSlot {
  @Field(() => ID)
  id: string;
  
  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field()
  weekday: Weekday;
}
