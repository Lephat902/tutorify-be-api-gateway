import {
  ArgsType,
  Field,
  registerEnumType
} from '@nestjs/graphql';
import { DataPresentationOption, StatisticTimeIntervalOption } from '@tutorify/shared';
import { IsInt, IsNotEmpty } from 'class-validator';

registerEnumType(StatisticTimeIntervalOption, {
  name: 'StatisticTimeIntervalOption',
});

registerEnumType(DataPresentationOption, {
  name: 'DataPresentationOption',
});

@ArgsType()
export class StatisticArgs {
  @IsInt()
  @Field({
    nullable: false,
    description: 'Year to display statistic',
  })
  year: number;

  @IsNotEmpty()
  @Field(() => StatisticTimeIntervalOption, {
    nullable: false,
    description: 'Time interval option: quarter or month',
  })
  timeIntervalOption: StatisticTimeIntervalOption;

  @IsNotEmpty()
  @Field(() => DataPresentationOption, {
    nullable: false,
    description: 'Data presentation option: breakdown or accumulation',
  })
  presentationOption: DataPresentationOption;
}
