import { Args, Query, Resolver } from '@nestjs/graphql';
import { ClassCategoryService } from '../class-category.service';
import { ClassCategory } from '../models';
import { ClassCategoryQueryArgs } from '../args';

@Resolver(() => ClassCategory)
export class ClassCategoryResolver {
  constructor(private readonly classCategoryService: ClassCategoryService) {}

  @Query(() => [ClassCategory], { name: 'classCategories' })
  async getAllClassCategories(@Args() classCategoryQueryArgs: ClassCategoryQueryArgs): Promise<ClassCategory[]> {
    return this.classCategoryService.findAll(classCategoryQueryArgs);
  }
}
