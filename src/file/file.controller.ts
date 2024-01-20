import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { IAccessToken, TokenType } from '../auth/auth.interfaces'
import { TokenRequirements } from '../auth/token-requirements.decorator'
import { Token } from '../auth/token.decorator'
import { TokenGuard } from '../auth/token.guard'
import { FileMetadataDto } from './file.dto'
import { FileService } from './file.service'

@Controller('file')
@ApiTags('file')
@UseGuards(TokenGuard)
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a file' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
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
  @ApiBearerAuth()
  @TokenRequirements(TokenType.CLIENT, [])
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() meta: FileMetadataDto
  ) {
    return this.fileService.upload(file, meta)
  }

  @Post('download')
  @ApiOperation({ summary: 'Download a file' })
  @ApiBearerAuth()
  @TokenRequirements(TokenType.CLIENT, [])
  public async downloadFile(@Body() meta: FileMetadataDto) {
    return this.fileService.download(meta)
  }

  @Get('avatar')
  @ApiOperation({ summary: 'Download user avatar' })
  @ApiBearerAuth()
  @TokenRequirements(TokenType.CLIENT, [])
  public async downloadAvatar(@Token() token: IAccessToken) {
    const meta: FileMetadataDto = {
      container: 'avatar',
      name: `user-${token.id}`,
    }
    return this.fileService.download(meta)
  }
}
