import { Controller, Post, Delete, Get, Body, Param, Query, UseGuards, Patch } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassCreateDto, ClassDto, ClassQueryDto } from './dtos';
import { TokenRequirements } from 'src/auth/token-requirements.decorator';
import { IAccessToken, TokenType } from 'src/auth/auth.interfaces';
import { Token } from 'src/auth/token.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/token.guard';
import { ClassUpdateDto } from './dtos/class-update.dto';
import { UserRole } from '@tutorify/shared';

@Controller()
@ApiTags('Class')
@UseGuards(TokenGuard)
export class ClassController {
    constructor(private readonly classService: ClassService) { }

    @ApiOperation({ summary: "Student creates a class requirement." })
    @Post('classes')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    @ApiBearerAuth()
    async addClass(@Token() token: IAccessToken, @Body() classData: ClassCreateDto): Promise<ClassDto> {
        const studentId = token.id;
        return this.classService.addClass(studentId, classData);
    }

    @ApiOperation({ summary: "Student removes a class requirement." })
    @Delete('classes/:id')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    @ApiBearerAuth()
    async deleteClass(@Token() token: IAccessToken, @Param('id') classId: string): Promise<void> {
        await this.classService.validateClassOwnership(token, classId);
        this.classService.deleteClassById(classId);
    }

    @ApiOperation({ summary: "Student updates a class requirement." })
    @Patch('classes/:id')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT])
    @ApiBearerAuth()
    async updateClass(@Token() token: IAccessToken, @Param('id') classId: string, @Body() classData: ClassUpdateDto): Promise<ClassDto> {
        await this.classService.validateClassOwnership(token, classId);
        return this.classService.updateClass(classId, classData);
    }

    @ApiOperation({ summary: "Student/admin/manager hides a class requirement." })
    @Patch('classes/:id/hide')
    @TokenRequirements(TokenType.CLIENT, [UserRole.STUDENT, UserRole.ADMIN, UserRole.MANAGER])
    @ApiBearerAuth()
    async hideClass(@Token() token: IAccessToken, @Param('id') classId: string): Promise<ClassDto> {
        await this.classService.validateClassOwnership(token, classId);
        return this.classService.hideClass(classId);
    }

    @ApiOperation({ summary: "Retrieve a specific class requirement by its id." })
    @Get('classes/:id')
    async getClassById(@Param('id') id: string): Promise<ClassDto> {
        return this.classService.getClassById(id);
    }

    @ApiOperation({ summary: "Retrieve a list of classes requirement using set of filter attributes." })
    @Get('classes')
    async getClasses(@Query() filters: ClassQueryDto): Promise<ClassDto[]> {
        return this.classService.getClasses(filters);
    }

    @ApiOperation({ summary: "Student/Tutor retrieves a list of classes of his own." })
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

    @ApiOperation({ summary: "Admin/Manager retrieves a list of classes by student id." })
    @Get('classes/student/:studentId')
    @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
    @ApiBearerAuth()
    async getClassesByStudentId(@Param('studentId') studentId: string, @Query() filters: ClassQueryDto): Promise<ClassDto[]> {
        return this.classService.getClassesByStudentId(studentId, filters);
    }

    @ApiOperation({ summary: "Admin/Manager retrieves a list of classes by tutor id." })
    @Get('classes/tutor/:tutorId')
    @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
    @ApiBearerAuth()
    async getClassesByTutorId(@Param('tutorId') tutorId: string, @Query() filters: ClassQueryDto): Promise<ClassDto[]> {
        return this.classService.getClassesByTutorId(tutorId, filters);
    }

    @ApiOperation({ summary: "Admin/Manager retrieves a list of classes by user id." })
    @Get('classes/user/:userId')
    @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
    @ApiBearerAuth()
    async getClassesByUserId(@Param('userId') userId: string, @Query() filters: ClassQueryDto): Promise<ClassDto[]> {
        return this.classService.getClassesByUserId(userId, filters);
    }
}
