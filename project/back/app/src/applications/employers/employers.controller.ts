import { Controller, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EmployersService } from './employers.service';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Post(':employerId/jobs')
  createJob(@Param('employerId') employerId: string, @Body() jobData: any) {
    return this.employersService.createJob(employerId, jobData);
  }

  @Put(':employerId/jobs/:jobId')
  updateJob(@Param('employerId') employerId: string, @Param('jobId') jobId: string, @Body() jobData: any) {
    return this.employersService.updateJob(employerId, jobId, jobData);
  }

  @Delete(':employerId/jobs/:jobId')
  deleteJob(@Param('employerId') employerId: string, @Param('jobId') jobId: string) {
    return this.employersService.deleteJob(employerId, jobId);
  }
}