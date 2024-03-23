import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import {
  ClassCreateDto,
  ClassDto,
  ClassUpdateDto,
} from './dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IAccessToken } from 'src/auth/auth.interfaces';
import { QueueNames, UserRole } from '@tutorify/shared';
import { Class } from './models';
import { ClassQueryArgs } from './args';
import { ClassPaginatedResults } from './models/class-paginated-results.model';

@Injectable()
export class ClassService {
  constructor(
    @Inject(QueueNames.CLASS_AND_CATEGORY) private readonly client: ClientProxy,
  ) { }

  async addClass(
    studentId: string,
    classData: ClassCreateDto,
  ): Promise<ClassDto> {
    return firstValueFrom(
      this.client.send(
        { cmd: 'addClass' },
        {
          studentId,
          classData,
        },
      ),
    );
  }

  async deleteClassById(id: string): Promise<void> {
    return firstValueFrom(this.client.send({ cmd: 'deleteClassById' }, id));
  }

  async hideClass(id: string): Promise<ClassDto> {
    const updateDto = { isHidden: true };
    return firstValueFrom(
      this.client.send(
        { cmd: 'updateClass' },
        {
          id,
          updateDto,
        },
      ),
    );
  }

  async updateClass(id: string, classData: ClassUpdateDto): Promise<ClassDto> {
    return firstValueFrom(
      this.client.send(
        { cmd: 'updateClass' },
        {
          id,
          classData,
        },
      ),
    );
  }

  async getClassById(id: string) {
    return firstValueFrom(this.client.send({ cmd: 'getClassById' }, id));
  }

  async getClassesAndTotalCount(filters: ClassQueryArgs): Promise<ClassPaginatedResults> {
    return firstValueFrom(this.client.send({ cmd: 'getClassesAndTotalCount' }, filters));
  }

  // Return class data in case of success, throw error if failed
  async assertClassOwnership(token: IAccessToken, classId: string) {
    const userId = token.id;
    const userRole = token.roles[0];
    const cl = await this.getClassById(classId);

    if (userRole === UserRole.STUDENT && cl.studentId !== userId) {
      throw new ForbiddenException('You are not the owner of this class');
    }

    return cl;
  }

  async assertTutorOfTheClass(token: IAccessToken, classId: string) {
    const userId = token.id;
    const userRole = token.roles[0];
    const cl = await this.getClassById(classId);

    if (userRole === UserRole.TUTOR && cl.tutorId !== userId) {
      throw new ForbiddenException('You are not the tutor of this class');
    }

    return cl;
  }
}
