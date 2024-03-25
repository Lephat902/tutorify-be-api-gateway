import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import {
  ClassCreateDto,
  ClassUpdateDto,
} from './dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IAccessToken } from 'src/auth/auth.interfaces';
import { QueueNames, UserRole } from '@tutorify/shared';
import { ClassQueryArgs } from './args';
import { ClassPaginatedResults } from './models/class-paginated-results.model';
import { isAdmin } from 'src/common/helpers';

@Injectable()
export class ClassService {
  constructor(
    @Inject(QueueNames.CLASS_AND_CATEGORY) private readonly client: ClientProxy,
  ) { }

  async addClass(
    studentId: string,
    classData: ClassCreateDto,
  ) {
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

  async deleteClassById(id: string, token: IAccessToken): Promise<boolean> {
    return firstValueFrom(this.client.send({ cmd: 'deleteClassById' }, {
      id,
      userMakeRequest: token.id,
    }));
  }

  async hideClass(id: string, token: IAccessToken) {
    const classData: Partial<ClassUpdateDto> = {
      isHidden: true,
      isAdmin: isAdmin(token),
      userMakeRequest: token.id,
    };
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

  async cancelClass(id: string): Promise<boolean> {
    return firstValueFrom(
      this.client.send({ cmd: 'cancelClass' }, id),
    );
  }

  async updateClass(
    id: string,
    classData: ClassUpdateDto,
    token: IAccessToken,
  ) {
    classData.isAdmin = isAdmin(token);
    classData.userMakeRequest = token.id;
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
