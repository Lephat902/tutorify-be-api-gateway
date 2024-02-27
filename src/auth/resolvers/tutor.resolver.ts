import { Args, Query, Resolver } from "@nestjs/graphql";
import { Tutor } from "../models";
import { AuthService } from "../auth.service";
import { TutorArgs } from "../args";
import { UserRole } from "@tutorify/shared";

@Resolver(() => Tutor)
export class TutorResolver {
    constructor(private readonly authService: AuthService) { }

    @Query(() => Tutor, { name: 'tutor' })
    async getTutor(@Args('id') id: string): Promise<Tutor> {
        return this.authService.getUserById(id);
    }

    @Query(() => [Tutor], { name: 'tutors' })
    async getTutors(@Args() filters: TutorArgs): Promise<Tutor[]> {
        const filtersWithOnlyTutor = { ...filters, role: UserRole.TUTOR };
        return this.authService.getUsers(filtersWithOnlyTutor);
    }
}
