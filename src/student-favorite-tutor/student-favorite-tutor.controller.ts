import { Controller, Post, Delete, Param, Get, UseGuards } from '@nestjs/common';
import { StudentFavoriteTutorService } from './student-favorite-tutor.service';
import { UserRole } from '@tutorify/shared';
import { TokenRequirements, Token } from 'src/auth/decorators';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/guards';

@Controller('my/favorite-tutors')
@ApiTags('Student Favorites Tutor')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class StudentFavoriteTutorController {
    constructor(private readonly studentFavoriteTutorService: StudentFavoriteTutorService) { }

    @ApiOperation({ summary: 'Student adds a tutor to favorites.' })
    @Post(':tutorId')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    addToFavorites(@Token() token: IAccessToken, @Param('tutorId') tutorId: string) {
        const studentId = token.id;
        return this.studentFavoriteTutorService.addToFavorites(studentId, tutorId);
    }

    @ApiOperation({ summary: 'Student removes a tutor from favorites.' })
    @Delete(':tutorId')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    removeFromFavorites(@Token() token: IAccessToken, @Param('tutorId') tutorId: string) {
        const studentId = token.id;
        return this.studentFavoriteTutorService.removeFromFavorites(studentId, tutorId);
    }

    @ApiOperation({ summary: 'Student retrieves tutors in favorites.' })
    @Get()
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    getFavoriteTutors(@Token() token: IAccessToken) {
        const studentId = token.id;
        return this.studentFavoriteTutorService.getFavoriteTutors(studentId);
    }
}
