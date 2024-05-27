import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { QueueNames, mergeArraysById } from '@tutorify/shared';
import { firstValueFrom } from 'rxjs';
import { ClassCategoryQueryArgs } from './args';
import { ClassCategory, Level, Subject } from './models';

@Injectable()
export class ClassCategoryService {
  constructor(
    @Inject(QueueNames.CLASS_AND_CATEGORY) private readonly classAndCategoryClient: ClientProxy,
    @Inject(QueueNames.TUTOR_QUERY) private readonly tutorQueryClient: ClientProxy,
  ) { }

  async findAll(classCategoryQueryArgs: ClassCategoryQueryArgs): Promise<ClassCategory[]> {
    // Query when tutorCount is required
    const classCategoriesFromTutorQueryP = classCategoryQueryArgs.includeTutorCount ?
      firstValueFrom(
        this.tutorQueryClient.send<ClassCategory[]>({ cmd: 'get_all_categories' }, classCategoryQueryArgs),
      ) :
      null;
    // Query when classCount is required or in default case (nothing is required)
    const classCategoriesFromClassCategoryP = (
      classCategoryQueryArgs.includeClassCount ||
      !classCategoryQueryArgs.includeTutorCount
    ) ?
      firstValueFrom(
        this.classAndCategoryClient.send<ClassCategory[]>({ cmd: 'get_all_categories' }, classCategoryQueryArgs),
      ) :
      null;
    const [classCategoriesFromTutorQuery, classCategoriesFromClassCategory] = await Promise.all([
      classCategoriesFromTutorQueryP,
      classCategoriesFromClassCategoryP,
    ]);
    if (classCategoriesFromTutorQuery && classCategoriesFromClassCategory)
      return mergeArraysById(classCategoriesFromClassCategory, classCategoriesFromTutorQuery);

    return classCategoriesFromClassCategory ?? classCategoriesFromTutorQuery;
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
