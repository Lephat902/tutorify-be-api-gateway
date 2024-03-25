import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { ClassCreateDto } from '.';

export class ClassUpdateDto extends OmitType(ClassCreateDto, [
  'desiredTutorIds',
] as const) {
  @ApiHideProperty()
  isHidden: boolean;

  @ApiHideProperty()
  isAdmin: boolean;

  @ApiHideProperty()
  userMakeRequest: string;
}
