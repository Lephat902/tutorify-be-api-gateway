import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames } from '@tutorify/shared';

@Injectable()
export class TutorProficientInClassCategoryService {
    constructor(
        @Inject(QueueNames.TUTOR_PROFICIENT_IN_CLASS_CATEGORY) private readonly client: ClientProxy,
    ) { }

    addToProficienciesList(tutorId: string, classCategoryId: string) {
        return firstValueFrom(this.client.send({ cmd: 'addToProficienciesList' }, {
            tutorId,
            classCategoryId,
        }));
    }

    removeFromProficienciesList(tutorId: string, classCategoryId: string) {
        return firstValueFrom(this.client.send({ cmd: 'removeFromProficienciesList' }, {
            tutorId,
            classCategoryId,
        }));
    }

    getProficienciesListByTutorId(tutorId: string) {
        return firstValueFrom(this.client.send({ cmd: 'getProficienciesListByTutorId' }, tutorId));
    }
}
