import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames } from '@tutorify/shared';
import { ClassCategory, Level, Subject } from './models';
import { ClassCategoryQueryArgs } from './args';

@Injectable()
export class ClassCategoryService {
  constructor(
    @Inject(QueueNames.CLASS_AND_CATEGORY) private readonly client: ClientProxy,
  ) {}

  findAll(classCategoryQueryArgs: ClassCategoryQueryArgs): Promise<ClassCategory[]> {
    console.log(classCategoryQueryArgs);
    return firstValueFrom(
      this.client.send<ClassCategory[]>({ cmd: 'get_all_categories' }, classCategoryQueryArgs),
    );
  }

  findWholeCategoryHierarchyByIds(ids: string[]): Promise<ClassCategory[]> {
    return firstValueFrom(
      this.client.send<ClassCategory[]>({ cmd: 'get_whole_category_hierarchy_by_ids' }, ids),
    );
  }

  findAllSubjects(): Promise<Subject[]> {
    return firstValueFrom(
      this.client.send<Subject[]>({ cmd: 'get_all_subjects' }, {}),
    );
  }

  findAllLevels(): Promise<Level[]> {
    return firstValueFrom(
      this.client.send<Level[]>({ cmd: 'get_all_levels' }, {}),
    );
  }

  findSubjectsByLevel(levelId: string): Promise<Subject[]> {
    return firstValueFrom(
      this.client.send<Subject[]>({ cmd: 'get_subjects_by_level' }, levelId),
    );
  }

  findLevelsBySubject(subjectId: string): Promise<Level[]> {
    return firstValueFrom(
      this.client.send<Level[]>({ cmd: 'get_levels_by_subject' }, subjectId),
    );
  }

  insert(level: Level, subject: Subject): Promise<ClassCategory> {
    return firstValueFrom(
      this.client.send<ClassCategory>(
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
