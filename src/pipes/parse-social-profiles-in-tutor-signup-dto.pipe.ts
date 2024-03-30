import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { deepParseJson } from 'deep-parse-json';
import { isArray } from 'class-validator';

@Injectable()
export class ParseSocialProfilesInTutorSignUpDtoPipe
  implements PipeTransform<any>
{
  async transform(value: any, { metatype }: ArgumentMetadata) {
    try {
      console.log(value);
      if (value?.socialProfiles) {
        value.socialProfiles = deepParseJson(value.socialProfiles);
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error in validation');
    }
    const socialProfiles = value.socialProfiles;

    if (!isArray(socialProfiles)) {
      throw new BadRequestException('socialProfiles must be an array');
    }

    for (const profile of socialProfiles) {
      if (
        typeof profile?.name !== 'string' ||
        typeof profile?.url !== 'string'
      ) {
        throw new BadRequestException('profile must be SocialProfile');
      }

      if (profile.name === '') {
        throw new BadRequestException('socialProfile.name must not be empty');
      }

      if (profile.url === '') {
        throw new BadRequestException('socialProfile.url must not be empty');
      }
    }
    return value;
  }
}
