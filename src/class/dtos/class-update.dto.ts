import { PartialType } from '@nestjs/swagger';
import { ClassCreateDto } from '.';

export class ClassUpdateDto extends PartialType(ClassCreateDto) {}