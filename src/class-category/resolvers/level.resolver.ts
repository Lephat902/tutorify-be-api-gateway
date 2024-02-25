import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Level, Subject } from '../models';
import { ClassCategoryService } from '../class-category.service';

@Resolver(of => Level)
export class LevelResolver {
    constructor(private readonly classCategoryService: ClassCategoryService) { }

    @Query(returns => [Level], { name: 'levels' })
    async findAllLevels(): Promise<Level[]> {
        return this.classCategoryService.findAllLevels();
    }

    @ResolveField('subjects', returns => [Subject], {
        nullable: true,
        description: 'All subjects compatible with this level.',
    })
    async findSubjectsByLevel(@Parent() level: Level): Promise<Level[]> {
        const { id } = level;
        return this.classCategoryService.findSubjectsByLevel(id);
    }
}