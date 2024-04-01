import {
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { FileService } from './file.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { TokenRequirements } from 'src/auth/decorators';
import { TokenType } from 'src/auth/auth.interfaces';
import { validateAvatar, validateMaterial, validatePortfolio } from 'src/auth/helpers';
import { UploadType } from './enums';
import { UploadTypeDto } from './dtos';
import { FileUploadResponseDto } from '@tutorify/shared';

@Controller('files')
@ApiTags('File')
@UseGuards(TokenGuard)
export class FileController {
  constructor(
    private readonly fileService: FileService,
  ) { }

  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: "Upload a single file"
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post()
  async uploadSingleFile(
    @UploadedFile('file') file: Express.Multer.File,
    @Query() uploadTypeDto: UploadTypeDto,
  ): Promise<FileUploadResponseDto> {
    console.log(file);
    await this.validateFile(file, uploadTypeDto.uploadType);
    return this.fileService.uploadSingleFile(file);
  }

  @Delete(':id')
  @ApiOperation({
    summary: "Delete a single file, mostly invoked by uploaded-file discarded by users"
  })
  @TokenRequirements(TokenType.SYSTEM, [])
  @ApiBearerAuth()
  deleteSingleFile(
    @Param('id') id: string,
  ) {
    return this.fileService.deleteSingleFile(id);
  }

  private async validateFile(file: Express.Multer.File, uploadType: UploadType) {
    switch (uploadType) {
      case UploadType.AVATAR:
        await validateAvatar(file);
        break;
      case UploadType.PORTFOLIO:
        await validatePortfolio(file);
        break;
      case UploadType.MATERIAL:
        await validateMaterial(file);
        break;
    }
  }
}
