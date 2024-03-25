import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Admin, Manager, Student, Tutor, User } from '../models';
import { AuthService } from '../auth.service';
import { Ward } from 'src/address/models';
import { AddressService } from 'src/address/address.service';
import { IAccessToken, TokenType } from '../auth.interfaces';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { TokenGuard } from '../guards';
import { Token, TokenRequirements } from '../decorators';
import { UserPreferencesService } from 'src/user-preferences/user-preferences.service';
import { UserRole } from '@tutorify/shared';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly addressService: AddressService,
    private readonly userPreferencesService: UserPreferencesService,
  ) { }

  @Query(() => User, { name: 'myProfile' })
  @UseGuards(TokenGuard)
  @TokenRequirements(TokenType.CLIENT, [])
  async getMyProfile(
    @Token() token: IAccessToken,
  ): Promise<User> {
    return this.authService.getUserById(token.id);
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string): Promise<(Admin | Manager | Student | Tutor)> {
    return this.authService.getUserById(id);
  }

  @ResolveField('ward', () => Ward, {
    nullable: true,
    description: 'Full ward information, based on wardId',
  })
  async getWardHierarchy(
    @Parent() user: User,
  ) {
    const { wardId } = user;
    const wardHierarchy = this.addressService.getWardHierarchyById(wardId);
    return wardHierarchy;
  }

  @ResolveField('interestedClassCategoryIds', () => [String], {
    nullable: true,
    description: 'Class Categories that student is interested in',
  })
  @UseGuards(TokenGuard)
  @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
  async getInterestedClassCategoryIds(
    @Parent() user: User,
    @Token() token: IAccessToken,
  ) {
    const { id } = user;
    if (token.id !== id)
      throw new ForbiddenException("This is of another user profile");
    return this.userPreferencesService.getCategoryPreferencesByUserId(id);
  }

  @ResolveField('proficienciesIds', () => [String], {
    nullable: true,
    description: "Class Categories' ids that tutor claim to be able to teach",
  })
  async getProficienciesIds(
    @Parent() user: User,
  ) {
    const { id, role } = user;
    if (role !== UserRole.TUTOR) return null;
    return this.userPreferencesService.getCategoryPreferencesByUserId(id);
  }
}
