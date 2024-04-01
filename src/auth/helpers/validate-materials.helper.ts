import { MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';
import { NormalFileTypeValidator } from 'src/common/file-validators';

export async function validateMaterial(material: Express.Multer.File) {
  return new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({
        maxSize: 1024 * 1024 * 20,
        message: 'Maximum file size is 20MB',
      }),
      new NormalFileTypeValidator(),
    ],
  }).transform(material);
}

export async function validateMaterials(materials: Express.Multer.File[]) {
  await Promise.all(
    materials.map(async (file) => validateMaterial(file)),
  );
}