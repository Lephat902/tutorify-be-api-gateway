import { IntersectionType, OmitType } from '@nestjs/swagger';
import { SignUpStudentDto } from '../signup';
import { OverwriteCreate } from './overwrite-create.dto';

export class UpdateStudentDto extends IntersectionType(
  OmitType(
    SignUpStudentDto,
    [
      'email',
    ] as const
  ),
  OverwriteCreate
) { }