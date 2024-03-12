import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ClassCategoryDto, LevelDto, SubjectDto } from './dtos';
import { QueueNames } from '@tutorify/shared';

@Injectable()
export class ClassCategoryService {
  constructor(
    @Inject(QueueNames.CLASS_AND_CATEGORY) private readonly client: ClientProxy,
  ) {}

  findAll(): Promise<ClassCategoryDto[]> {
    return firstValueFrom(
      this.client.send<ClassCategoryDto[]>({ cmd: 'get_all_categories' }, {}),
    );
  }

  findAllSubjects(): Promise<SubjectDto[]> {
    return firstValueFrom(
      this.client.send<SubjectDto[]>({ cmd: 'get_all_subjects' }, {}),
    );
  }

  findAllLevels(): Promise<LevelDto[]> {
    return firstValueFrom(
      this.client.send<LevelDto[]>({ cmd: 'get_all_levels' }, {}),
    );
  }

  findSubjectsByLevel(levelId: string): Promise<SubjectDto[]> {
    return firstValueFrom(
      this.client.send<SubjectDto[]>({ cmd: 'get_subjects_by_level' }, levelId),
    );
  }

  findLevelsBySubject(subjectId: string): Promise<LevelDto[]> {
    return firstValueFrom(
      this.client.send<LevelDto[]>({ cmd: 'get_levels_by_subject' }, subjectId),
    );
  }

  insert(level: LevelDto, subject: SubjectDto): Promise<ClassCategoryDto> {
    return firstValueFrom(
      this.client.send<ClassCategoryDto>(
        { cmd: 'insert_category' },
        { level, subject },
      ),
    );
  }

  getNumberOfClassesByCategoryId(classCategoryId: string): Promise<number> {
    return firstValueFrom(
      this.client.send<number>({ cmd: 'getNumberOfClassesByCategoryId' }, classCategoryId),
    );
  }
}
