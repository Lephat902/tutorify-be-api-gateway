import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { QueueNames } from '@tutorify/shared';
import { TutorQueryArgs } from './args';
import { TutorQuery, TutorQueryPaginatedResults } from './models';
import { QUERY_TIMEOUT } from 'src/common/constants';

@Injectable()
export class TutorQueryService {
  constructor(
    @Inject(QueueNames.TUTOR_QUERY) private readonly client: ClientProxy,
  ) { }

  async getTutorsAndTotalCount(filters: TutorQueryArgs): Promise<TutorQueryPaginatedResults> {
    try {
      return await firstValueFrom(
        this.client.send<TutorQueryPaginatedResults>({ cmd: 'getTutorsAndTotalCount' }, filters)
          .pipe(timeout(QUERY_TIMEOUT))
      );
    } catch (error) {
      console.error("Error fetching tutors and total count:", error);
      return await Promise.resolve(null);
    }
  }

  async getTutorById(id: string): Promise<TutorQuery> {
    if (!id) return null;

    try {
      return await firstValueFrom(
        this.client.send<TutorQuery>({ cmd: 'getTutorById' }, id)
          .pipe(timeout(QUERY_TIMEOUT))
      );
    } catch (error) {
      console.error("Error fetching tutor by id:", error);
      return await Promise.resolve(null);
    }
  }
}
