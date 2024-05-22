import {
  ArgsType,
  Field,
  registerEnumType
} from '@nestjs/graphql';
import { ClassOrderBy, ClassStatus } from '@tutorify/shared';
import { IsOptional } from 'class-validator';
import { StatisticArgs } from 'src/common/graphql';

registerEnumType(ClassOrderBy, {
  name: 'ClassOrderBy',
});

@ArgsType()
export class ClassStatisticArgs extends StatisticArgs {
  @IsOptional()
  @Field(() => [ClassStatus], {
    nullable: true,
    description: 'Statuses of classes in the results',
  })
  statuses: ClassStatus[];
}
