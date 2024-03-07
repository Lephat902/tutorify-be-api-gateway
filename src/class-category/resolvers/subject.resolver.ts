import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Level, Subject } from '../models';
import { ClassCategoryService } from '../class-category.service';

@Resolver(() => Subject)
export class SubjectResolver {
  constructor(private readonly classCategoryService: ClassCategoryService) {}

  @Query(() => [Subject], { name: 'subjects' })
  async findAllSubjects(): Promise<Subject[]> {
    return this.classCategoryService.findAllSubjects();
  }

  @ResolveField('levels', () => [Level], {
    nullable: true,
    description: 'All levels compatible with this subject.',
  })
  async findLevelsBySubject(@Parent() subject: Subject): Promise<Subject[]> {
    const { id } = subject;
    return this.classCategoryService.findLevelsBySubject(id);
  }
}
