import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from '../models';
import { AuthService } from '../auth.service';
import { UserArgs } from '../args';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string): Promise<User> {
    return this.authService.getUserById(id);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers(@Args() filters: UserArgs): Promise<User[]> {
    return this.authService.getUsers(filters);
  }
}
