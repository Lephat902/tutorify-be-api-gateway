import { MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';
import {
  AvatarTypeValidator,
} from 'src/common/file-validators';

export async function validateAvatar(avatar: Express.Multer.File) {
  await new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: 1024 * 1024,
        message: 'Maximum image size is 1MB.',
      }),
      new AvatarTypeValidator(),
    ],
  }).transform(avatar);
}
