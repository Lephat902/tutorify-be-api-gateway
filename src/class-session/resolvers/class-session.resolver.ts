import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { ClassSessionService } from '../class-session.service';
import { ClassSession } from '../models';

@Resolver(() => ClassSession)
@UseGuards(TokenGuard)
export class ClassSessionResolver {
  constructor(private readonly classSessionService: ClassSessionService) {}

  @Query(() => ClassSession, { name: 'classSession' })
  async getClassSessionById(@Args('id') id: string) {
    return this.classSessionService.getClassSessionById(id);
  }
}
