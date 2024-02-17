import { Controller, Post, Delete, Get, Body, Param, Query, UseGuards, Patch, ForbiddenException } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassCreateDto, ClassDto, ClassQueryDto } from './dtos';
import { TokenRequirements } from 'src/auth/token-requirements.decorator';
import { IAccessToken, TokenType, UserRole } from 'src/auth/auth.interfaces';
import { Token } from 'src/auth/token.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/token.guard';
import { ClassUpdateDto } from './dtos/class-update.dto';

@Controller()
@ApiTags('Class')
@UseGuards(TokenGuard)
export class ClassController {
    constructor(private readonly classService: ClassService) { }

    @Post('classes')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    @ApiBearerAuth()
    async addClass(@Token() token: IAccessToken, @Body() classData: ClassCreateDto): Promise<ClassDto> {
        const studentId = token.id;
        return this.classService.addClass(studentId, classData);
    }

    @Delete('classes/:id')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    @ApiBearerAuth()
    async deleteClass(@Token() token: IAccessToken, @Param('id') classId: string): Promise<void> {
        const userId = token.id;
        const classToDelete = await this.classService.getClassById(classId);

        if (classToDelete.studentId !== userId) {
            throw new ForbiddenException("You are not authorized to delete this class.");
        }

        this.classService.deleteClassById(classId);
    }

    @Patch('classes/:id')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    @ApiBearerAuth()
    async updateClass(@Token() token: IAccessToken, @Param('id') classId: string, @Body() classData: ClassUpdateDto): Promise<ClassDto> {
        const userId = token.id;
        const classToUpdate = await this.classService.getClassById(classId);

        if (classToUpdate.studentId !== userId) {
            throw new ForbiddenException("You are not authorized to update this class.");
        }

        return this.classService.updateClass(classId, classData);
    }

    @Patch('classes/:id/hide')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT, UserRole.ADMIN, UserRole.MANAGER])
    @ApiBearerAuth()
    async hideClass(@Token() token: IAccessToken, @Param('id') classId: string): Promise<ClassDto> {
        const userId = token.id;
        const userRole = token.roles[0];
        const classToUpdate = await this.classService.getClassById(classId);

        if (userRole === UserRole.STUDENT && classToUpdate.studentId !== userId) {
            throw new ForbiddenException("You are not authorized to hide this class.");
        }
        const classDataToUpdate = {...classToUpdate, isHidden: true};

        return this.classService.updateClass(classId, classDataToUpdate);
    }

    @Get('classes/:id')
    async getClassById(@Param('id') id: string): Promise<ClassDto> {
        return this.classService.getClassById(id);
    }

    @Get('classes')
    async getClasses(@Query() filters: ClassQueryDto): Promise<ClassDto[]> {
        return this.classService.getClasses(filters);
    }

    @Get('my/classes')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT, UserRole.TUTOR])
    @ApiBearerAuth()
    async getMyClass(@Token() token: IAccessToken, @Query() filters: ClassQueryDto): Promise<ClassDto[]> {
        const { id, roles } = token;
        // Currently, our system only allows one role per user
        if (roles[0] === UserRole.STUDENT) {
            return this.classService.getClassesByStudentId(id, filters);
        } else {
            return this.classService.getClassesByTutorId(id, filters);
        }
    }

    @Get('classes/student/:studentId')
    @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
    @ApiBearerAuth()
    async getClassesByStudentId(@Param('studentId') studentId: string, @Query() filters: ClassQueryDto): Promise<ClassDto[]> {
        return this.classService.getClassesByStudentId(studentId, filters);
    }

    @Get('classes/tutor/:tutorId')
    @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
    @ApiBearerAuth()
    async getClassesByTutorId(@Param('tutorId') tutorId: string, @Query() filters: ClassQueryDto): Promise<ClassDto[]> {
        return this.classService.getClassesByTutorId(tutorId, filters);
    }
}
