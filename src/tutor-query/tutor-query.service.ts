import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames } from '@tutorify/shared';
import { TutorArgs } from './args';
import { Tutor } from './models';

@Injectable()
export class TutorQueryService {
  constructor(
    @Inject(QueueNames.TUTOR_QUERY) private readonly client: ClientProxy,
  ) {}

  getTutorsAndTotalCount(filters: TutorArgs): Promise<{
    results: Tutor[],
    totalCount: number,
  }> {
    return firstValueFrom(this.client.send({ cmd: 'getTutorsAndTotalCount' }, filters));
  }

  getTutorById(id: string): Promise<Tutor> {
    return firstValueFrom(this.client.send({ cmd: 'getTutorById' }, id));
  }
}
