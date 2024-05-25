import {
  ArgsType,
  Field
} from '@nestjs/graphql';
import { ClassStatus } from '@tutorify/shared';
import { IsOptional } from 'class-validator';
import { StatisticArgs } from 'src/common/graphql';

@ArgsType()
export class ClassStatisticByYearArgs extends StatisticArgs {
  @IsOptional()
  @Field({
    defaultValue: false,
    nullable: true,
    description: 'Return short month name',
  })
  shortMonthName: boolean;

  @IsOptional()
  @Field(() => [ClassStatus], {
    nullable: true,
    description: 'Statuses of classes in the results',
  })
  statuses: ClassStatus[];
}
