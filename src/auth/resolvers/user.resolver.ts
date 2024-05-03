import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Admin, Manager, Student, Tutor, User } from '../models';
import { AuthService } from '../auth.service';
import { Ward } from 'src/address/models';
import { IAccessToken, TokenType } from '../auth.interfaces';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from '../guards';
import { Token, TokenRequirements } from '../decorators';
import { AddressProxy } from '@tutorify/shared';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly addressProxy: AddressProxy,
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
    const user = await this.authService.getUserById(id);

    return user;
  }

  @ResolveField('ward', () => Ward, {
    nullable: true,
    description: 'Full ward information, based on wardId',
  })
  async getWardHierarchy(
    @Parent() user: User,
  ) {
    const { wardId } = user;
    return this.addressProxy.getFullAddressByWardCode(wardId);
  }
}
