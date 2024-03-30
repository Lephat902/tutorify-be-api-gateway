import {
  ArgsType,
  OmitType,
} from '@nestjs/graphql';
import { ClassSessionQueryArgs } from './class-session-query.args';

@ArgsType()
export class ClassQueryArgs extends OmitType(
  ClassSessionQueryArgs,
  ['q', 'classId', 'statuses'] as const
) { }