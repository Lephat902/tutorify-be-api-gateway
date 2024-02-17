import { Inject, Injectable } from '@nestjs/common';
import { ClassCreateDto, ClassDto, ClassQueryDto, ClassUpdateDto } from './dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClassService {
    constructor(
        @Inject('CLASS_SERVICE') private readonly client: ClientProxy,
    ) { }

    async addClass(studentId: string, classData: ClassCreateDto): Promise<ClassDto> {
        return firstValueFrom(this.client.send({ cmd: 'addClass' }, {
            studentId,
            classData,
        }));
    }

    async deleteClassById(id: string): Promise<void> {
        return firstValueFrom(this.client.send({ cmd: 'deleteClassById' }, {
            id,
        }));
    }

    async updateClass(id: string, classData: ClassUpdateDto): Promise<ClassDto> {
        return firstValueFrom(this.client.send({ cmd: 'updateClass' }, {
            id,
            classData,
        }));
    }

    async getClassById(id: string): Promise<ClassDto> {
        return firstValueFrom(this.client.send({ cmd: 'getClassById' }, id));
    }

    async getClasses(filters: ClassQueryDto): Promise<ClassDto[]> {
        return firstValueFrom(this.client.send({ cmd: 'getClasses' }, {
            filters,
        }));
    }

    async getClassesByStudentId(studentId: string, filters: ClassQueryDto): Promise<ClassDto[]> {
        return firstValueFrom(this.client.send({ cmd: 'getClassesByStudentId' }, {
            studentId,
            filters,
        }));
    }

    async getClassesByTutorId(tutorId: string, filters: ClassQueryDto): Promise<ClassDto[]> {
        return firstValueFrom(this.client.send({ cmd: 'getClassesByTutorId' }, {
            tutorId,
            filters,
        }));
    }
}
