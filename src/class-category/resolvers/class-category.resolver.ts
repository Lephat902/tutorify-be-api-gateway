import { Query, Resolver } from '@nestjs/graphql';
import { ClassCategoryService } from '../class-category.service';
import { ClassCategory } from '../models';

@Resolver((of) => ClassCategory)
export class ClassCategoryResolver {
  constructor(private readonly classCategoryService: ClassCategoryService) {}

  @Query((returns) => [ClassCategory], { name: 'classCategories' })
  async getAllClassCategories(): Promise<ClassCategory[]> {
    return this.classCategoryService.findAll();
  }
}
