import {
  Controller,
  Post,
  Delete,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { TutorProficiencyService } from './tutor-proficiency.service';
import { UserRole } from '@tutorify/shared';
import { TokenRequirements, Token } from 'src/auth/decorators';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/guards';

@Controller('tutors')
@ApiTags('Tutor Proficiencies')
@UseGuards(TokenGuard)
export class TutorProficiencyController {
  constructor(
    private readonly tutorProficiencyService: TutorProficiencyService,
  ) {}

  @ApiOperation({
    summary: 'Tutor adds a class category to proficiencies list.',
  })
  @Post('/proficiencies/:classCategoryId')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  @ApiBearerAuth()
  addOneToProficienciesList(
    @Token() token: IAccessToken,
    @Param('classCategoryId') classCategoryId: string,
  ) {
    const tutorId = token.id;
    return this.tutorProficiencyService.addOneToProficienciesList(
      tutorId,
      classCategoryId,
    );
  }

  @ApiOperation({
    summary: 'Tutor removes a class category from proficiencies list.',
  })
  @Delete('/proficiencies/:classCategoryId')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  @ApiBearerAuth()
  removeFromProficienciesList(
    @Token() token: IAccessToken,
    @Param('classCategoryId') classCategoryId: string,
  ) {
    const tutorId = token.id;
    return this.tutorProficiencyService.removeFromProficienciesList(
      tutorId,
      classCategoryId,
    );
  }

  @ApiOperation({ summary: 'Tutor retrieves his own proficiencies list.' })
  @Get('/my/proficiencies')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  @ApiBearerAuth()
  getMyProficienciesList(@Token() token: IAccessToken) {
    const tutorId = token.id;
    return this.tutorProficiencyService.getProficienciesListByTutorId(
      tutorId,
    );
  }

  @ApiOperation({ summary: 'Retrieve proficiencies list of a specific tutor.' })
  @Get('/:tutorId/proficiencies')
  getProficienciesListByTutorId(@Param('tutorId') tutorId: string) {
    return this.tutorProficiencyService.getProficienciesListByTutorId(
      tutorId,
    );
  }
}
