import { Inject, Injectable } from '@nestjs/common';
import { ClassSessionCreateDto, ClassSessionUpdateDto } from './dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames, UserMakeRequest } from '@tutorify/shared';
import { ClassSessionQueryArgs } from './args';
import { ClassSession, ClassSessionPaginatedResults } from './models';

@Injectable()
export class ClassSessionService {
  constructor(
    @Inject(QueueNames.CLASS_SESSION) private readonly client: ClientProxy,
  ) { }

  async createClassSessions(
    tutorId: string,
    classId: string,
    classSessionData: ClassSessionCreateDto,
  ) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'createClassSessions' },
        {
          tutorId,
          classId,
          ...classSessionData,
        },
      ),
    );
  }

  async updateClassSession(
    tutorId: string,
    classSessionId: string,
    classSessionUpdateDto: ClassSessionUpdateDto,
  ) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'updateClassSession' },
        {
          classSessionId,
          tutorId,
          ...classSessionUpdateDto,
        },
      ),
    );
  }

  async deleteSingleMaterial(
    tutorId: string,
    classSessionId: string,
    materialId: string,
  ) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'deleteSingleMaterial' },
        {
          tutorId,
          classSessionId,
          materialId,
        },
      ),
    );
  }

  async getClassSessionsAndTotalCount(
    filters: ClassSessionQueryArgs,
  ): Promise<ClassSessionPaginatedResults> {
    return firstValueFrom(
      this.client.send({ cmd: 'getClassSessionsAndTotalCount' }, filters),
    );
  }

  async getClassSessionById(
    classSessionId: string,
    userMakeRequest: UserMakeRequest,
  ): Promise<ClassSession> {
    return firstValueFrom(
      this.client.send({ cmd: 'getClassSessionById' }, {
        classSessionId,
        userMakeRequest,
      }),
    );
  }

  async getNonCancelledClassSessionsCount(
    classId: string,
    userMakeRequest: UserMakeRequest,
  ): Promise<number> {
    return firstValueFrom(
      this.client.send({ cmd: 'getNonCancelledClassSessionsCount' }, {
        classId,
        userMakeRequest,
      }),
    );
  }

  async getScheduledClassSessionsCount(
    classId: string,
    userMakeRequest: UserMakeRequest,
  ): Promise<number> {
    return firstValueFrom(
      this.client.send({ cmd: 'getScheduledClassSessionsCount' }, {
        classId,
        userMakeRequest,
      }),
    );
  }
}
