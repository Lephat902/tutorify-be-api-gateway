import { Inject, Injectable } from '@nestjs/common';
import { ProcessApplicationDto, TutorApplyForClassCreateDto } from './dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
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

  async processApplication(processApplicationDto: ProcessApplicationDto) {
    return firstValueFrom(
      this.client.send({ cmd: 'processApplication' }, processApplicationDto),
    );
  }
}
