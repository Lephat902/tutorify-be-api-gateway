import { ObjectType, OmitType } from '@nestjs/graphql';
import { Tutor } from 'src/auth/models';

@ObjectType()
export class TutorQuery extends OmitType(Tutor, ['phoneNumber', 'role'] as const) { }