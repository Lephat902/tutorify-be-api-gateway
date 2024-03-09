import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto, ReportQueryDto, ReportResponseDto } from './dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('reports')
@ApiTags('Report')
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
  @Post()
  async addReport(@Body() reportDto: CreateReportDto): Promise<ReportResponseDto> {
    return this.reportService.createReport(reportDto);
  }

  @ApiOperation({
    summary:
      'Resolve a report',
  })
  @Patch('/:id/resolve')
  async resolve(@Param('id', ParseIntPipe) id: number): Promise<ReportResponseDto> {
    return this.reportService.resolve(id);
  }

  @ApiOperation({
    summary:
      'Reject a report',
  })
  @Patch('/:id/reject')
  async reject(@Param('id') id: string): Promise<ReportResponseDto> {
    return this.reportService.reject(id);
  }
}
