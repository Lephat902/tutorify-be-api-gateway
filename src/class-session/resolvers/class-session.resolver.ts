import { Resolver, Query, Args } from '@nestjs/graphql';
import { ClassSessionQueryArgs } from '../args';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { ClassSessionService } from '../class-session.service';
import { ClassSession } from '../models';

@Resolver((of) => ClassSession)
@UseGuards(TokenGuard)
export class ClassSessionResolver {
  constructor(private readonly classService: ClassSessionService) {}

  @Query((returns) => ClassSession, { name: 'classSession' })
  async getClassSessionById(@Args('id') id: string) {
    return this.classService.getClassSessionById(id);
  }

  @Query((returns) => [ClassSession], { name: 'classSessions' })
  async getClassSessiones(@Args() filters: ClassSessionQueryArgs) {
    return this.classService.getAllClassSessions(filters);
  }
}
