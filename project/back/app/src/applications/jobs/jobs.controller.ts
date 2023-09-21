import { Controller, Res } from '@nestjs/common';
import { Post, Put, Delete, Param, Body, Get } from '@nestjs/common';
import { JobsDomain } from './jobs.domain';
import * as mongoose from 'mongoose';
import { Job, JobId, jobData } from 'src/core/jobs/job.entity';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsDomain) {}

    @Get()
    findAllJobs() {
      console.log('GET request received for all jobs')
      return this.jobsService.findAllJobs();
    }

    @Get(':jobId')
    async findJobById( @Param('jobId') jobId: mongoose.Types.ObjectId, @Res() res) {
      console.log('GET request received for job ', jobId)
      const ret = await this.jobsService.findJobById(jobId).then((job) => {
      return job;})
    }

    @Get('image/:jobId')
    async findJobImageById( @Param('jobId') jobId: mongoose.Types.ObjectId, @Res() res) {
      console.log('GET request received for job image ', jobId)
      const ret = await this.jobsService.findJobById(jobId).then((job) => {
        res.contentType(job.imageType);
        res.send(job.imageBuffer);

      })
    }

  
    @Post(':email')
    async validateJob( @Param('email') email: string, @Body() jobData: JobId) {
      console.log('POST request received to validate job ', jobData)
      return this.jobsService.addJobSeeker(email, jobData);
    }


  
    @Put(':jobId')
    updateJob( @Param('jobId') jobId: mongoose.Types.ObjectId, @Body() jobData: jobData) {
      console.log('PUT request received for job ', jobId)
      return this.jobsService.updateJob(jobId, jobData);
    }



}
