import { IntersectionType, OmitType } from '@nestjs/swagger';
import { SignUpTutorDto } from '../signup';
import { OverwriteCreate } from './overwrite-create.dto';

export class UpdateTutorDto extends IntersectionType(
  OmitType(
    SignUpTutorDto,
    [
      'email',
    ] as const
  ),
  OverwriteCreate
) { }