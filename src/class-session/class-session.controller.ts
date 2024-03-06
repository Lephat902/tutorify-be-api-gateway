import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  Param,
  Body,
} from '@nestjs/common';
import { ClassSessionCreateDto, ClassSessionCreateByQtyDto } from './dtos';
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

@Controller('/classess/:classId/sessions')
@ApiTags('Class Session')
@UseGuards(TokenGuard)
@ApiBearerAuth()
export class ClassSessionController {
  constructor(
    private readonly classSessionService: ClassSessionService,
  ) {}

  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Tutor creates a new class session to a class.' })
  @Post()
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async createClassSession(
    @Token() token: IAccessToken,
    @Param('classId') classId: string,
    @Body() classSessionCreateDto: ClassSessionCreateDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const tutorId = token.id;
    if (files) {
      await validateMaterials(files);
    }

    const fullClassSesionCreateDto: ClassSessionCreateDto & {
      materials?: {
        description: string;
        file: Express.Multer.File;
      }[];
    } = { ...classSessionCreateDto };

    if (classSessionCreateDto.description && files) {
      fullClassSesionCreateDto.materials = files.map((file, index) => ({
        description: classSessionCreateDto.description[index] || '',
        file: file,
      }));
    }

    return this.classSessionService.addClassSession(
      tutorId,
      classId,
      fullClassSesionCreateDto,
    );
  }

  @ApiOperation({ summary: 'Tutor creates class sessions by number desired.' })
  @Post('create_by_qty')
  @TokenRequirements(TokenType.CLIENT, [UserRole.TUTOR])
  async createClassSessionsWithNumberOfSessions(
    @Token() token: IAccessToken,
    @Param('classId') classId: string,
    @Body() classSessionCreateByQtyDto: ClassSessionCreateByQtyDto,
  ) {
    const tutorId = token.id;
    return this.classSessionService.createClassSessionsWithNumberOfSessions(
      tutorId,
      classId,
      classSessionCreateByQtyDto.numberOfSessions,
    );
  }
}
