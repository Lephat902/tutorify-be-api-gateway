import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { TutorApplyForClassCreateDto } from './dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IAccessToken } from 'src/auth/auth.interfaces';
import { QueueNames } from '@tutorify/shared';
import { TutorApplyForClassArgs } from './args';
import { TutorApplyForClass } from './models';

@Injectable()
export class TutorApplyForClassService {
  constructor(
    @Inject(QueueNames.TUTOR_APPLY_FOR_CLASS)
    private readonly client: ClientProxy,
  ) { }

  async applyForClass(
    tutorId: string,
    classId: string,
  ): Promise<TutorApplyForClass> {
    const createDto: TutorApplyForClassCreateDto = {
      tutorId,
      classId,
      isDesignated: false,
    };

    return firstValueFrom(
      this.client.send({ cmd: 'addNewApplication' }, createDto),
    );
  }

  async getApplicationById(id: string): Promise<TutorApplyForClass> {
    return firstValueFrom(this.client.send({ cmd: 'getApplicationById' }, id));
  }

  async getAllApplications(
    filters: TutorApplyForClassArgs,
  ): Promise<TutorApplyForClass[]> {
    return firstValueFrom(
      this.client.send({ cmd: 'getAllApplications' }, filters),
    );
  }

  async cancelApplication(applicationId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'cancelTutorApplyForClass' }, applicationId),
    );
  }

  async rejectApplication(applicationId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'rejectTutorApplyForClass' }, applicationId),
    );
  }

  async approveApplication(applicationId: string) {
    return firstValueFrom(
      this.client.send({ cmd: 'approveTutorApplyForClass' }, applicationId),
    );
  }

  async validateApplicationOwnership(
    token: IAccessToken,
    applicationId: string,
  ) {
    const userId = token.id;
    const application = await this.getApplicationById(applicationId);
    if (application.tutorId !== userId) {
      throw new ForbiddenException(
        'You are not the owner of this application.',
      );
    }

    return application;
  }
}
