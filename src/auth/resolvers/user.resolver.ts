import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { User } from '../models';
import { AuthService } from '../auth.service';
import { UserArgs } from '../args';
import { Ward } from 'src/address/models';
import { AddressService } from 'src/address/address.service';
import { IAccessToken, TokenType } from '../auth.interfaces';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from '../guards';
import { Token, TokenRequirements } from '../decorators';


@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly addressService: AddressService,
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
  async getUser(@Args('id') id: string): Promise<User> {
    return this.authService.getUserById(id);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers(@Args() filters: UserArgs): Promise<User[]> {
    return this.authService.getUsers(filters);
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
}
