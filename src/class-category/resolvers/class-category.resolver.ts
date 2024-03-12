import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ClassCategoryService } from '../class-category.service';
import { ClassCategory } from '../models';

@Resolver(() => ClassCategory)
export class ClassCategoryResolver {
  constructor(private readonly classCategoryService: ClassCategoryService) {}

  @Query(() => [ClassCategory], { name: 'classCategories' })
  async getAllClassCategories(): Promise<ClassCategory[]> {
    return this.classCategoryService.findAll();
  }

  @ResolveField('classCount', () => Number, {
    nullable: true,
    description: 'Total count of classes categorized under this class category.',
  })
  async getNumberOfClassesByCategoryId(
    @Parent() classCategory: ClassCategory,
  ): Promise<number> {
    const { id } = classCategory;
    return this.classCategoryService.getNumberOfClassesByCategoryId(id);
  }
}
