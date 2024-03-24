import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames } from '@tutorify/shared';

@Injectable()
export class TutorProficiencyService {
  constructor(
    @Inject(QueueNames.USER_PREFERENCES)
    private readonly client: ClientProxy,
  ) { }

  addOneToProficienciesList(tutorId: string, classCategoryId: string) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'addOneClassCategory' },
        {
          userId: tutorId,
          classCategoryId,
        },
      ),
    );
  }

  removeFromProficienciesList(tutorId: string, classCategoryId: string) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'removeClassCategory' },
        {
          userId: tutorId,
          classCategoryId,
        },
      ),
    );
  }

  getProficienciesListByTutorId(tutorId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'getClassCategoryPreferencesByUserId' }, tutorId),
    );
  }
}
