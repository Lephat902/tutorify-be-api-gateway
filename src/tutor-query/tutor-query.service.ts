import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames } from '@tutorify/shared';
import { TutorQueryArgs } from './args';
import { TutorQuery } from './models';

@Injectable()
export class TutorQueryService {
  constructor(
    @Inject(QueueNames.TUTOR_QUERY) private readonly client: ClientProxy,
  ) {}

  getTutorsAndTotalCount(filters: TutorQueryArgs): Promise<{
    results: TutorQuery[],
    totalCount: number,
  }> {
    return firstValueFrom(this.client.send({ cmd: 'getTutorsAndTotalCount' }, filters));
  }

  getTutorById(id: string): Promise<TutorQuery> {
    return firstValueFrom(this.client.send({ cmd: 'getTutorById' }, id));
  }
}
