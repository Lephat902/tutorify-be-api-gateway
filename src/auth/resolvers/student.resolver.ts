import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { User, Student } from '../models';
import { UserPreferencesService } from 'src/user-preferences/user-preferences.service';
import { UserRole } from '@tutorify/shared';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { TokenGuard } from '../guards';
import { IAccessToken, TokenType } from '../auth.interfaces';
import { Token, TokenRequirements } from '../decorators';
import { ClassCategoryService } from 'src/class-category/class-category.service';
import { ClassCategory } from 'src/class-category/models';

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private readonly userPreferencesService: UserPreferencesService,
    private readonly classCategoryService: ClassCategoryService,
  ) { }

  @ResolveField('interestedClassCategories', () => [ClassCategory], {
    nullable: true,
    description: 'Class Categories that student is interested in',
  })
  @UseGuards(TokenGuard)
  @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
  async getInterestedClassCategoryIds(
    @Parent() user: User,
    @Token() token: IAccessToken,
  ): Promise<ClassCategory[]> {
    const { id } = user;
    if (token.id !== id)
      throw new ForbiddenException("This is of another user profile");
    const interestedClassCategoriesIds = await this.userPreferencesService.getCategoryPreferencesByUserId(id);
    return interestedClassCategoriesIds.length > 0
      ? this.classCategoryService.findWholeCategoryHierarchyByIds(interestedClassCategoriesIds)
      : [];
  }
}
