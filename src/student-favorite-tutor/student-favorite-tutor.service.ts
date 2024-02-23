import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames } from '@tutorify/shared';

@Injectable()
export class StudentFavoriteTutorService {
    constructor(
        @Inject(QueueNames.STUDENT_FAVORITE_TUTOR) private readonly client: ClientProxy,
    ) { }

    addToFavorites(studentId: string, tutorId: string) {
        return firstValueFrom(this.client.send({ cmd: 'addToFavorites' }, {
            studentId,
            tutorId,
        }));
    }

    removeFromFavorites(studentId: string, tutorId: string) {
        return firstValueFrom(this.client.send({ cmd: 'removeFromFavorites' }, {
            studentId,
            tutorId,
        }));
    }

    getFavoriteTutors(studentId: string) {
        return firstValueFrom(this.client.send({ cmd: 'getFavoriteTutors' }, studentId));
    }
}
