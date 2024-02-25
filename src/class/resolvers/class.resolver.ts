import { Resolver, Query, Args } from '@nestjs/graphql';
import { ClassService } from '../class.service';
import { Class } from '../models';
import { ClassQueryArgs } from '../args';
import { UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/auth/guards';

@Resolver(of => Class)
@UseGuards(TokenGuard)
export class ClassResolver {
    constructor(private readonly classService: ClassService) { }

    @Query(returns => Class, { name: 'class' })
    async getClassById(@Args('id') id: string) {
        return this.classService.getClassById(id);
    }

    @Query(returns => [Class], { name: 'classes' })
    async getClasses(@Args() filters: ClassQueryArgs) {
        return this.classService.getClasses(filters);
    }
}
