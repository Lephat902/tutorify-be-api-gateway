import { IntersectionType, OmitType } from '@nestjs/swagger';
import { SignUpDto } from '../signup';
import { OverwriteCreate } from './overwrite-create.dto';

export class UpdateDto extends IntersectionType(
  OmitType(
    SignUpDto,
    [
      'email',
    ] as const
  ),
  OverwriteCreate
) { }