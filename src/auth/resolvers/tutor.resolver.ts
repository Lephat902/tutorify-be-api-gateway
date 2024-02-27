import { Args, Query, Resolver } from "@nestjs/graphql";
import { Tutor } from "../models";
import { AuthService } from "../auth.service";

@Resolver(() => Tutor)
export class TutorResolver {
    constructor(private readonly authService: AuthService) { }

    @Query(() => Tutor, { name: 'tutor' })
    async getTutor(@Args('id') id: string): Promise<Tutor> {
        return this.authService.getUser(id);
    }
}
