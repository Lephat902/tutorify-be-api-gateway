import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames } from '@tutorify/shared';
import { TutorArgs } from './args';

@Injectable()
export class TutorQueryService {
  constructor(
    @Inject(QueueNames.TUTOR_QUERY) private readonly client: ClientProxy,
  ) {}

  getTutors(filters: TutorArgs) {
    return firstValueFrom(this.client.send({ cmd: 'getTutors' }, filters));
  }
}
