import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import {
  ClassCategoryDto,
  ClassCategoryInsertDto,
  LevelDto,
  SubjectDto,
} from './dtos';
import { ClassCategoryService } from './class-category.service';

@Controller('class-category')
@ApiTags('Class Category')
export class ClassCategoryController {
  constructor(private readonly classCategoryService: ClassCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all class categories' })
  @ApiResponse({ status: 200, description: 'Returns all class categories' })
  getAll(): Promise<ClassCategoryDto[]> {
    return this.classCategoryService.findAll();
  }

  @Get('subjects')
  @ApiOperation({ summary: 'Get all subjects' })
  @ApiResponse({ status: 200, description: 'Returns all subjects' })
  getAllSubjects(): Promise<SubjectDto[]> {
    return this.classCategoryService.findAllSubjects();
  }

  @Get('levels')
  @ApiOperation({ summary: 'Get all levels' })
  @ApiResponse({ status: 200, description: 'Returns all levels' })
  getAllLevels(): Promise<LevelDto[]> {
    return this.classCategoryService.findAllLevels();
  }

  @Get('levels/:levelId/subjects')
  @ApiOperation({ summary: 'Get subjects by level' })
  @ApiParam({ name: 'levelId', description: 'ID of the level', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Returns subjects for the specified level',
  })
  getSubjectsByLevel(@Param('levelId') levelId: string): Promise<SubjectDto[]> {
    return this.classCategoryService.findSubjectsByLevel(levelId);
  }

  @Get('subjects/:subjectId/levels')
  @ApiOperation({ summary: 'Get levels by subject' })
  @ApiParam({
    name: 'subjectId',
    description: 'ID of the subject',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns levels for the specified subject',
  })
  getLevelsBySubject(
    @Param('subjectId') subjectId: string,
  ): Promise<LevelDto[]> {
    return this.classCategoryService.findLevelsBySubject(subjectId);
  }

  @Post()
  @ApiOperation({
    summary: 'Insert class category',
    description:
      'The name of the level/subject is taken first, if not present then the id will be taken',
  })
  @ApiResponse({
    status: 201,
    description: 'Returns the created class category',
  })
  insert(@Body() dto: ClassCategoryInsertDto): Promise<ClassCategoryDto> {
    return this.classCategoryService.insert(dto.level, dto.subject);
  }
}
