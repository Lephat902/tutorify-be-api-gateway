import { OmitType } from '@nestjs/swagger';
import { ClassCreateDto } from '.';

export class ClassUpdateDto extends OmitType(ClassCreateDto, ['desiredTutorIds'] as const) {}