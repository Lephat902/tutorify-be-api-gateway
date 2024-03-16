import {
  Controller,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassCreateDto, ClassDto } from './dtos';
import { TokenRequirements, Token } from 'src/auth/decorators';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/guards';
import { ClassUpdateDto } from './dtos/class-update.dto';
import { UserRole } from '@tutorify/shared';

@Controller()
@ApiTags('Class')
@UseGuards(TokenGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @ApiOperation({ summary: 'Student creates a class requirement.' })
  @Post('classes')
  @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
  @ApiBearerAuth()
  async addClass(
    @Token() token: IAccessToken,
    @Body() classData: ClassCreateDto,
  ): Promise<ClassDto> {
    const studentId = token.id;
    return this.classService.addClass(studentId, classData);
  }

  @ApiOperation({ summary: 'Student removes a class requirement.' })
  @Delete('classes/:id')
  @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
  @ApiBearerAuth()
  async deleteClass(
    @Token() token: IAccessToken,
    @Param('id') classId: string,
  ): Promise<void> {
    await this.classService.assertClassOwnership(token, classId);
    this.classService.deleteClassById(classId);
  }

  @ApiOperation({ summary: 'Student updates a class requirement.' })
  @Patch('classes/:id')
  @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
  @ApiBearerAuth()
  async updateClass(
    @Token() token: IAccessToken,
    @Param('id') classId: string,
    @Body() classData: ClassUpdateDto,
  ): Promise<ClassDto> {
    await this.classService.assertClassOwnership(token, classId);
    return this.classService.updateClass(classId, classData);
  }

  @ApiOperation({ summary: 'Student/admin/manager hides a class requirement.' })
  @Patch('classes/:id/hide')
  @TokenRequirements(TokenType.CLIENT, [
    UserRole.STUDENT,
    UserRole.ADMIN,
    UserRole.MANAGER,
  ])
  @ApiBearerAuth()
  async hideClass(
    @Token() token: IAccessToken,
    @Param('id') classId: string,
  ): Promise<ClassDto> {
    await this.classService.assertClassOwnership(token, classId);
    return this.classService.hideClass(classId);
  }
}