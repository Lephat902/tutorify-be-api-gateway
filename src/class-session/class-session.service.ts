import { Inject, Injectable } from '@nestjs/common';
import { ClassSessionCreateDto } from './dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames } from '@tutorify/shared';
import { ClassSessionQueryArgs } from './args';
import { ClassSession } from './models';

@Injectable()
export class ClassSessionService {
  constructor(
    @Inject(QueueNames.CLASS_SESSION) private readonly client: ClientProxy,
  ) {}

  async addClassSession(
    classId: string,
    classSessionData: ClassSessionCreateDto,
  ) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'createClassSession' },
        {
          classId,
          ...classSessionData,
        },
      ),
    );
  }

  async createClassSessionsWithNumberOfSessions(
    classId: string,
    numberOfSessions: number,
  ) {
    return firstValueFrom(
      this.client.send(
        { cmd: 'createClassSessionsWithNumberOfSessions' },
        {
          classId,
          numberOfSessions,
        },
      ),
    );
  }

  async getAllClassSessions(
    filters: ClassSessionQueryArgs,
  ): Promise<ClassSession[]> {
    return firstValueFrom(
      this.client.send({ cmd: 'getAllClassSessions' }, filters),
    );
  }

  async getClassSessionById(classSessionId: string): Promise<ClassSession> {
    return firstValueFrom(
      this.client.send({ cmd: 'getClassSessionById' }, classSessionId),
    );
  }
}
