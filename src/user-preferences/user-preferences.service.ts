import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { QueueNames } from '@tutorify/shared';
import { QUERY_TIMEOUT } from 'src/common/constants';

@Injectable()
export class UserPreferencesService {
  constructor(
    @Inject(QueueNames.USER_PREFERENCES)
    private readonly client: ClientProxy,
  ) { }

  async getCategoryPreferencesByUserId(userId: string): Promise<string[]> {
    try {
      return await firstValueFrom(
        this.client.send<string[]>({ cmd: 'getClassCategoryPreferencesByUserId' }, userId)
          .pipe(timeout(QUERY_TIMEOUT))
      );
    } catch (error) {
      console.error("Error fetching class category preferences:", error);
      return await Promise.resolve([]);
    }
  }
}
