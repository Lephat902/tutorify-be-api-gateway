import { Inject, Injectable } from '@nestjs/common';
import { ClassSessionCreateDto, ClassSessionUpdateDto } from './dtos';
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
