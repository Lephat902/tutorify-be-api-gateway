import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { Tutor } from '../models';
import { UserPreferencesService } from 'src/user-preferences/user-preferences.service';
import { ClassCategory } from 'src/class-category/models';
import { ClassCategoryService } from 'src/class-category/class-category.service';

@Resolver(() => Tutor)
export class TutorResolver {
  constructor(
    private readonly userPreferencesService: UserPreferencesService,
    private readonly classCategoryService: ClassCategoryService,
  ) { }

  @ResolveField('proficiencies', () => [ClassCategory], {
    nullable: true,
    description: "Class Categories' that tutor claims to be able to teach",
  })
  async getProficienciesIds(
    @Parent() tutor: Tutor,
  ): Promise<ClassCategory[]> {
    const { id } = tutor;
    const proficienciesIds = await this.userPreferencesService.getCategoryPreferencesByUserId(id);
    return proficienciesIds.length > 0
      ? this.classCategoryService.findWholeCategoryHierarchyByIds(proficienciesIds)
      : [];
  }
}
