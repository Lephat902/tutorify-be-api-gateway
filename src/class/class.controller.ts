import { Controller, Post, Delete, Put, Get, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassCreateUpdateDto, ClassDto, ClassQueryDto } from './dtos';
import { TokenRequirements } from 'src/auth/token-requirements.decorator';
import { IAccessToken, TokenType, UserRole } from 'src/auth/auth.interfaces';
import { Token } from 'src/auth/token.decorator';
import { ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/token.guard';

@Controller('class')
@ApiTags('class')
@UseGuards(TokenGuard)
export class ClassController {
    constructor(private readonly classService: ClassService) { }

    @Post()
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    async addClass(@Token() token: IAccessToken, @Body() classData: ClassCreateUpdateDto): Promise<ClassDto> {
        const studentId = token.id;
        return this.classService.addClass(studentId, classData);
    }

    @Delete(':id')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT, UserRole.ADMIN, UserRole.MANAGER])
    async removeClass(@Param('id') id: string): Promise<void> {
        return this.classService.removeClass(id);
    }

    @Put(':id')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    async updateClass(@Param('id') id: string, @Body() classData: ClassCreateUpdateDto): Promise<ClassDto> {
        return this.classService.updateClass(id, classData);
    }

    @Get('student/:studentId')
    async getClassByStudentId(@Param('studentId') studentId: string, @Query() filters: ClassQueryDto): Promise<ClassDto[]> {
        return this.classService.getClassByStudentId(studentId, filters);
    }

    @Get('tutor/:tutorId')
    async getClassByTutorId(@Param('tutorId') tutorId: string, @Query() filters: ClassQueryDto): Promise<ClassDto[]> {
        return this.classService.getClassByTutorId(tutorId, filters);
    }
}
