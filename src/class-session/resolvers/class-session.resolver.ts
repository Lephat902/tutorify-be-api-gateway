import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';
import { ClassSessionService } from '../class-session.service';
import { ClassSession } from '../models';
import { AddressService } from 'src/address/address.service';
import { Ward } from 'src/address/models';

@Resolver(() => ClassSession)
@UseGuards(TokenGuard)
export class ClassSessionResolver {
  constructor(
    private readonly classSessionService: ClassSessionService,
    private readonly addressService: AddressService,
  ) { }

  @Query(() => ClassSession, { name: 'classSession' })
  async getClassSessionById(@Args('id') id: string) {
    return this.classSessionService.getClassSessionById(id);
  }

  @ResolveField('ward', () => Ward, {
    nullable: true,
    description: 'Full ward information, based on wardId',
  })
  async getWardHierarchy(
    @Parent() classSession: ClassSession,
  ) {
    const { wardId } = classSession;
    return this.addressService.getWardHierarchyById(wardId);
  }
}
