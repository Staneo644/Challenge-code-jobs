import { Controller } from '@nestjs/common';
import { Post, Put, Delete, Param, Body } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Post(':employerId/jobs/:jobId')
    createJob(@Param('employerId') employerId: string, @Body() jobData: any) {

      return this.jobsService.createJob(jobData);
      
    }
  
    @Put(':employerId/jobs/:jobId')
    updateJob(@Param('employerId') employerId: string, @Param('jobId') jobId: string, @Body() jobData: any) {
      return this.jobsService.updateJob(employerId, jobId, jobData);
    }
  
    @Delete(':employerId/jobs/:jobId')
    deleteJob(@Param('employerId') employerId: string, @Param('jobId') jobId: string) {
      return this.jobsService.deleteJob(employerId, jobId);
    }

}
