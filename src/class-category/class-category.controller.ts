import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassCategoryInsertDto } from './dtos';
import { ClassCategoryService } from './class-category.service';
import { TokenGuard } from 'src/auth/guards';
import { TokenType } from 'src/auth/auth.interfaces';
import { UserRole } from '@tutorify/shared';
import { TokenRequirements } from 'src/auth/decorators';

@Controller('class-category')
@ApiTags('Class Category')
@UseGuards(TokenGuard)
export class ClassCategoryController {
  constructor(private readonly classCategoryService: ClassCategoryService) { }

  @Post()
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN])
  @ApiOperation({
    summary: 'Insert class category',
    description:
      'The name of the level/subject is taken first, if not present then the id will be taken',
  })
  @ApiResponse({
    status: 201,
    description: 'Returns the created class category',
  })
  insert(@Body() dto: ClassCategoryInsertDto) {
    return this.classCategoryService.insert(dto.level, dto.subject);
  }
}
