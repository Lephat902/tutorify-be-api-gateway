import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClassCategoryInsertDto } from './dtos';
import { ClassCategoryService } from './class-category.service';

@Controller('class-category')
@ApiTags('Class Category')
export class ClassCategoryController {
  constructor(private readonly classCategoryService: ClassCategoryService) { }

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
  insert(@Body() dto: ClassCategoryInsertDto) {
    return this.classCategoryService.insert(dto.level, dto.subject);
  }
}
