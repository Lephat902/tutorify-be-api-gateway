import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { ClassSessionService } from '../class-session.service';
import { ClassSession } from '../models';
import { Ward } from 'src/address/models';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { Token, TokenRequirements } from 'src/auth/decorators';
import { AddressProxy } from '@tutorify/shared';

@Resolver(() => ClassSession)
@UseGuards(TokenGuard)
export class ClassSessionResolver {
  constructor(
    private readonly classSessionService: ClassSessionService,
    private readonly addressProxy: AddressProxy,
  ) { }

  @Query(() => ClassSession, { 
    name: 'classSession',
    nullable: true,
  })
  @TokenRequirements(TokenType.CLIENT, [])
  async getClassSessionById(
    @Args('id') id: string,
    @Token() token: IAccessToken,
  ) {
    return this.classSessionService.getClassSessionById(id, {
      userId: token.id,
      userRole: token.roles[0],
    });
  }

  @ResolveField('ward', () => Ward, {
    nullable: true,
    description: 'Full ward information, based on wardId',
  })
  async getWardHierarchy(
    @Parent() classSession: ClassSession,
  ) {
    const { wardId } = classSession;
    return this.addressProxy.getFullAddressByWardCode(wardId);
  }
}
