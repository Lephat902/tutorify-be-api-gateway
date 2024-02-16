import { Inject, Injectable } from '@nestjs/common';
import { ClassCreateUpdateDto, ClassDto, ClassQueryDto } from './dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClassService {
    constructor(
        @Inject('CLASS_SERVICE') private readonly client: ClientProxy,
    ) { }

    async addClass(studentId: string, classData: ClassCreateUpdateDto): Promise<ClassDto> {
        return firstValueFrom(this.client.send({ cmd: 'addClass' }, {
            studentId,
            classData,
        }));
    }

    async removeClass(id: string): Promise<void> {
        return firstValueFrom(this.client.send({ cmd: 'removeClass' }, {
            id,
        }));
    }

    async updateClass(id: string, classData: ClassCreateUpdateDto): Promise<ClassDto> {
        return firstValueFrom(this.client.send({ cmd: 'updateClass' }, {
            id,
            classData,
        }));
    }

    async getClassByStudentId(studentId: string, filters: ClassQueryDto): Promise<ClassDto[]> {
        return firstValueFrom(this.client.send({ cmd: 'getClassByStudentId' }, {
            studentId,
            filters,
        }));
    }

    async getClassByTutorId(tutorId: string, filters: ClassQueryDto): Promise<ClassDto[]> {
        return firstValueFrom(this.client.send({ cmd: 'getClassByTutorId' }, {
            tutorId,
            filters,
        }));
    }
}
