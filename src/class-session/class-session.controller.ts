import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ClassSessionCreateDto, ClassSessionUpdateDto } from './dtos';
import { Token, TokenRequirements } from 'src/auth/decorators';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/guards';
import { UserRole } from '@tutorify/shared';
import { FilesInterceptor } from '@nestjs/platform-express';
import { validateMaterials } from './helpers';
import { ClassSessionService } from './class-session.service';

@Controller()
@ApiTags('Class Session')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class ClassSessionController {
  constructor(private readonly classSessionService: ClassSessionService) {}

  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Tutor creates class session(s) for a class.',
    description:
      'Tutor create at least one class, with options to create either a specific number of classes or to a specific time',
  })
  @Post('/classess/:classId/sessions')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async createClassSessions(
    @Token() token: IAccessToken,
    @Param('classId') classId: string,
    @Body() classSessionCreateDto: ClassSessionCreateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const tutorId = token.id;
    if (files) {
      await validateMaterials(files);
    }

    const fullClassSesionCreateDto: ClassSessionCreateDto = {
      ...classSessionCreateDto,
      files,
    };

    return this.classSessionService.createClassSessions(
      tutorId,
      classId,
      fullClassSesionCreateDto,
    );
  }

  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Tutor updates a class session.',
  })
  @Patch('/classess/sessions/:sessionId')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async updateClassSession(
    @Token() token: IAccessToken,
    @Param('sessionId') sessionId: string,
    @Body() classSessionUpdateDto: ClassSessionUpdateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const tutorId = token.id;
    if (files) {
      await validateMaterials(files);
    }

    const fullClassSessionUpdateDto: ClassSessionUpdateDto = {
      ...classSessionUpdateDto,
      files,
    };

    return this.classSessionService.updateClassSession(
      tutorId,
      sessionId,
      fullClassSessionUpdateDto,
    );
  }

  @ApiOperation({
    summary: 'Tutor deleted a class session material.',
  })
  @Delete('/classess/sessions/:classSessionId/materials/:materialId')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async deleteSingleMaterial(
    @Token() token: IAccessToken,
    @Param('classSessionId') classSessionId: string,
    @Param('materialId') materialId: string,
  ) {
    const tutorId = token.id;

    return this.classSessionService.deleteSingleMaterial(
      tutorId,
      classSessionId,
      materialId,
    );
  }
}
