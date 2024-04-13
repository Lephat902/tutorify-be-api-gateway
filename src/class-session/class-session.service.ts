import { Inject, Injectable } from '@nestjs/common';
import { ClassSessionCreateDto, ClassSessionUpdateDto } from './dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames, UserMakeRequest } from '@tutorify/shared';
import { ClassQueryArgs, ClassSessionQueryArgs } from './args';
import { ClassSession, ClassSessionPaginatedResults, ShortClass } from './models';
import { SessionStatsPerClass } from 'src/class-session/models/session-stats-per-class.model';

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

  async deleteClassSession(
    userMakeRequest: UserMakeRequest,
    classSessionId: string,
  ) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'deleteClassSession' },
        {
          classSessionId,
          userMakeRequest,
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

  async getClassesBySessionFilters(
    filters: ClassQueryArgs,
  ): Promise<{
    results: ShortClass[],
    totalCount: number,
  }> {
    return firstValueFrom(
      this.client.send({ cmd: 'getClasses' }, filters),
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

  async getSessionsStatsPerClass(
    classId: string,
    userMakeRequest: UserMakeRequest,
  ): Promise<SessionStatsPerClass> {
    return firstValueFrom(
      this.client.send({ cmd: 'getSessionsStatsPerClass' }, {
        classId,
        userMakeRequest,
      }),
    );
  }
}
