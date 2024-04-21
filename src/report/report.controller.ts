import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto, ReportQueryDto, ReportResponseDto } from './dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/auth/guards';
import { TokenType } from 'src/auth/auth.interfaces';
import { UserRole } from '@tutorify/shared';
import { TokenRequirements } from 'src/auth/decorators';

@Controller('reports')
@ApiTags('Report')
@UseGuards(TokenGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // Truncated Reason, retrive user image, name, ...
  @ApiOperation({
    summary:
      'Retrieve a list of reports using set of filter attributes.',
  })
  @Get()
  async getReports(@Query() filters: ReportQueryDto): Promise<ReportResponseDto[]> {
    return this.reportService.getReports(filters);
  }

  @ApiOperation({
    summary:
      'User adds a report.',
  })
  @TokenRequirements(TokenType.CLIENT, [])
  @Post()
  async addReport(@Body() reportDto: CreateReportDto): Promise<ReportResponseDto> {
    return this.reportService.createReport(reportDto);
  }

  @ApiOperation({
    summary:
      'Resolve a report',
  })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
  @Patch('/:id/resolve')
  async resolve(@Param('id', ParseIntPipe) id: number): Promise<ReportResponseDto> {
    return this.reportService.resolve(id);
  }

  @ApiOperation({
    summary:
      'Reject a report',
  })
  @TokenRequirements(TokenType.CLIENT, [UserRole.ADMIN, UserRole.MANAGER])
  @Patch('/:id/reject')
  async reject(@Param('id') id: string): Promise<ReportResponseDto> {
    return this.reportService.reject(id);
  }
}
