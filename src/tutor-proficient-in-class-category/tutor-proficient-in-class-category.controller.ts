import { Controller, Post, Delete, Param, Get, UseGuards } from '@nestjs/common';
import { TutorProficientInClassCategoryService } from './tutor-proficient-in-class-category.service';
import { UserRole } from '@tutorify/shared';
import { TokenRequirements } from 'src/auth/token-requirements.decorator';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { Token } from 'src/auth/token.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/token.guard';

@Controller('tutors')
@ApiTags('Tutor Proficiencies')
@UseGuards(TokenGuard)
export class TutorProficientInClassCategoryController {
    constructor(private readonly tutorProficientInClassCategoryService: TutorProficientInClassCategoryService) { }

    @ApiOperation({ summary: 'Tutor adds a class category to proficiencies list.' })
    @Post('/proficiencies/:classCategoryId')
    @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
    @ApiBearerAuth()
    addToProficienciesList(@Token() token: IAccessToken, @Param('classCategoryId') classCategoryId: string) {
        const tutorId = token.id;
        return this.tutorProficientInClassCategoryService.addToProficienciesList(tutorId, classCategoryId);
    }

    @ApiOperation({ summary: 'Tutor removes a class category from proficiencies list.' })
    @Delete('/proficiencies/:classCategoryId')
    @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
    @ApiBearerAuth()
    removeFromProficienciesList(@Token() token: IAccessToken, @Param('classCategoryId') classCategoryId: string) {
        const tutorId = token.id;
        return this.tutorProficientInClassCategoryService.removeFromProficienciesList(tutorId, classCategoryId);
    }

    @ApiOperation({ summary: 'Tutor retrieves his own proficiencies list.' })
    @Get('/my/proficiencies')
    @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
    @ApiBearerAuth()
    getMyProficienciesList(@Token() token: IAccessToken) {
        const tutorId = token.id;
        return this.tutorProficientInClassCategoryService.getProficienciesListByTutorId(tutorId);
    }

    @ApiOperation({ summary: 'Retrieve proficiencies list of a specific tutor.' })
    @Get('/:tutorId/proficiencies')
    getProficienciesListByTutorId(@Param('tutorId') tutorId: string) {
        return this.tutorProficientInClassCategoryService.getProficienciesListByTutorId(tutorId);
    }
}
