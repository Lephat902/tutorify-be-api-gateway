import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Level, Subject } from '../models';
import { ClassCategoryService } from '../class-category.service';

@Resolver(of => Subject)
export class SubjectResolver {
    constructor(private readonly classCategoryService: ClassCategoryService) { }

    @Query(returns => [Subject], { name: 'subjects' })
    async findAllSubjects(): Promise<Subject[]> {
        return this.classCategoryService.findAllSubjects();
    }

    @ResolveField('levels', returns => [Level])
    async findLevelsBySubject(@Parent() subject: Subject): Promise<Subject[]> {
        const { id } = subject;
        return this.classCategoryService.findLevelsBySubject(id);
    }
}