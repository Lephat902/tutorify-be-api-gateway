import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { SignUpTutorDto } from '../signup';
import { OverwriteCreate } from './overwrite-create.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateTutorDto extends IntersectionType(
  OmitType(
    SignUpTutorDto,
    [
      'email',
    ] as const
  ),
  OverwriteCreate
) { 
  @ApiProperty({
    description: "Class Categories' ids that tutor claim to be able to teach",
    type: 'array',
    items: { type: 'string' },
    required: false,
    example: [
      '3b5e5abb-f7ca-4503-bf8d-8e02dbc249e2',
      '83bdcea4-c6bf-4e7a-a9e0-d0894f5841bb',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  public readonly proficienciesIds: string[];
}