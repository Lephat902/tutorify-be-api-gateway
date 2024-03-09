import { Inject, Injectable } from '@nestjs/common';
import {
  CreateReportDto,
  ReportQueryDto,
  ReportResponseDto,
} from './dtos';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { QueueNames } from '@tutorify/shared';

@Injectable()
export class ReportService {
  constructor(
    @Inject(QueueNames.REPORT) private readonly client: ClientProxy,
  ) {}

  async getReports(filters: ReportQueryDto): Promise<ReportResponseDto[]> {
    return firstValueFrom(this.client.send({ cmd: 'findAllReports' }, filters));
  }

  async createReport(createReportDto: CreateReportDto) : Promise<ReportResponseDto> {
    return firstValueFrom(this.client.send({cmd: 'createReport'}, createReportDto));
  }

   resolve(id: number)  : Promise<ReportResponseDto>{
    return firstValueFrom(this.client.send({cmd: 'resolveReport'}, id));
  }

   reject(id: string)  : Promise<ReportResponseDto>{
    return firstValueFrom(this.client.send({cmd: 'rejectReport'}, id));
  }
}
