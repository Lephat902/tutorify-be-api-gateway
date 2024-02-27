import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from '../models';
import { AuthService } from '../auth.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string): Promise<User> {
    return this.authService.getUser(id);
  }
}