import { Controller } from '@nestjs/common';
import { Post, Put, Delete, Param, Body, Get } from '@nestjs/common';
import { JobsDomain } from './jobs.domain';
import * as mongoose from 'mongoose';
import { Job, JobId } from 'src/core/jobs/job.entity';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsDomain) {}

    @Get()
    findAllJobs() {
      console.log('GET request received for all jobs')
      return this.jobsService.findAllJobs();
    }

    @Get(':jobId')
    findJobById( @Param('jobId') jobId: mongoose.Types.ObjectId) {
      console.log('GET request received for job ', jobId)
      return this.jobsService.findJobById(jobId);
    }
  
    @Put(':jobId')
    updateJob( @Param('jobId') jobId: mongoose.Types.ObjectId, @Body() jobData: JobId) {
      console.log('PUT request received for job ', jobId)
      return this.jobsService.updateJob(jobId, jobData);
    }
}
