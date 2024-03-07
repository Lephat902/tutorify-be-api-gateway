import { Query, Resolver } from '@nestjs/graphql';
import { ClassCategoryService } from '../class-category.service';
import { ClassCategory } from '../models';

@Resolver(() => ClassCategory)
export class ClassCategoryResolver {
  constructor(private readonly classCategoryService: ClassCategoryService) {}

  @Query(() => [ClassCategory], { name: 'classCategories' })
  async getAllClassCategories(): Promise<ClassCategory[]> {
    return this.classCategoryService.findAll();
  }
}
