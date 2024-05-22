import {
  ArgsType,
  Field,
  registerEnumType
} from '@nestjs/graphql';
import { DataPresentationOption, StatisticTimeIntervalOption } from '@tutorify/shared';
import { IsInt, IsOptional } from 'class-validator';

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
    nullable: true,
    description: 'Year to display statistic',
  })
  year: number;

  @IsOptional()
  @Field(() => StatisticTimeIntervalOption, {
    nullable: true,
    description: 'Time interval option: quarter or month',
  })
  timeIntervalOption: StatisticTimeIntervalOption;

  @IsOptional()
  @Field(() => DataPresentationOption, {
    nullable: true,
    description: 'Data presentation option: breakdown or accumulation',
  })
  presentationOption: DataPresentationOption;
}
