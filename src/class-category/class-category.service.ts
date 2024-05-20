import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames } from '@tutorify/shared';
import { ClassCategory, Level, Subject } from './models';
import { ClassCategoryQueryArgs } from './args';

@Injectable()
export class ClassCategoryService {
  constructor(
    @Inject(QueueNames.CLASS_AND_CATEGORY) private readonly classAndCategoryClient: ClientProxy,
    @Inject(QueueNames.TUTOR_QUERY) private readonly tutorQueryClient: ClientProxy,
  ) { }

  findAll(classCategoryQueryArgs: ClassCategoryQueryArgs): Promise<ClassCategory[]> {
    const clientToQuery = classCategoryQueryArgs.includeTutorCount ?
      this.tutorQueryClient :
      this.classAndCategoryClient;
    return firstValueFrom(
      clientToQuery.send<ClassCategory[]>({ cmd: 'get_all_categories' }, classCategoryQueryArgs),
    );
  }

  findById(id: string): Promise<ClassCategory> {
    return firstValueFrom(
      this.classAndCategoryClient.send<ClassCategory>({ cmd: 'get_category_by_id' }, id),
    );
  }

  findWholeCategoryHierarchyByIds(ids: string[]): Promise<ClassCategory[]> {
    return firstValueFrom(
      this.classAndCategoryClient.send<ClassCategory[]>({ cmd: 'get_whole_category_hierarchy_by_ids' }, ids),
    );
  }

  findAllSubjects(): Promise<Subject[]> {
    return firstValueFrom(
      this.classAndCategoryClient.send<Subject[]>({ cmd: 'get_all_subjects' }, {}),
    );
  }

  findAllLevels(): Promise<Level[]> {
    return firstValueFrom(
      this.classAndCategoryClient.send<Level[]>({ cmd: 'get_all_levels' }, {}),
    );
  }

  findSubjectsByLevel(levelId: string): Promise<Subject[]> {
    return firstValueFrom(
      this.classAndCategoryClient.send<Subject[]>({ cmd: 'get_subjects_by_level' }, levelId),
    );
  }

  findLevelsBySubject(subjectId: string): Promise<Level[]> {
    return firstValueFrom(
      this.classAndCategoryClient.send<Level[]>({ cmd: 'get_levels_by_subject' }, subjectId),
    );
  }

  insert(level: Level, subject: Subject): Promise<ClassCategory> {
    return firstValueFrom(
      this.classAndCategoryClient.send<ClassCategory>(
        { cmd: 'insert_category' },
        { level, subject },
      ),
    );
  }

  getNumberOfClassesByCategoryId(classCategoryId: string): Promise<number> {
    return firstValueFrom(
      this.classAndCategoryClient.send<number>({ cmd: 'getNumberOfClassesByCategoryId' }, classCategoryId),
    );
  }
}
