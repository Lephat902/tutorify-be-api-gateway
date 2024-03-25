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
import { ClassCreateDto } from './dtos';
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
  ) {
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
  ): Promise<boolean> {
    return this.classService.deleteClassById(classId, token);
  }

  @ApiOperation({ summary: 'Student updates a class requirement.' })
  @Patch('classes/:id')
  @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
  @ApiBearerAuth()
  async updateClass(
    @Token() token: IAccessToken,
    @Param('id') classId: string,
    @Body() classData: ClassUpdateDto,
  ) {
    return this.classService.updateClass(classId, classData, token);
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
  ) {
    return this.classService.hideClass(classId, token);
  }

  @ApiOperation({ summary: 'Admin/manager cancels an assigned class due to some external problems.' })
  @Patch('classes/:id/cancel')
  @TokenRequirements(TokenType.CLIENT, [
    UserRole.ADMIN,
    UserRole.MANAGER,
  ])
  @ApiBearerAuth()
  async cancelClass(
    @Param('id') classId: string,
  ): Promise<boolean> {
    return this.classService.cancelClass(classId);
  }
}