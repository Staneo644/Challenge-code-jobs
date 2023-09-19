import { Controller, Res } from '@nestjs/common';
import { Post, Put, Delete, Param, Body, Get, UploadedFile } from '@nestjs/common';
import { JobsDomain } from './jobs.domain';
import * as mongoose from 'mongoose';
import { Job, JobId, jobData } from 'src/core/jobs/job.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { createReadStream } from 'fs';

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
      const ret = await this.jobsService.findJobById(jobId).then((job) => {

      //   console.log('GET request received for job ', jobId)
      //   try {
      //     const fileStream = createReadStream(job.image);
      //     fileStream.pipe(res);
      //     return ret;
      //   }
      //   catch (error) {
      //     return null;
      //   }
      // })
      return job;})

    }

    @Get('image/:jobId')
    async findJobImageById( @Param('jobId') jobId: mongoose.Types.ObjectId, @Res() res) { 
      const ret = await this.jobsService.findJobById(jobId).then((job) => {
        console.log(job.imageType)
        res.contentType(job.imageType);
        res.send(job.imageBuffer);

      })
    }
  
    @Put(':jobId')
    updateJob( @Param('jobId') jobId: mongoose.Types.ObjectId, @Body() jobData: jobData) {
      console.log('PUT request received for job ', jobId)
      return this.jobsService.updateJob(jobId, jobData);
    }

    @Put('image/:jobId')
    @UseInterceptors(FileInterceptor('image'))
    updateJobWithImage( @Param('jobId') jobId: mongoose.Types.ObjectId, @Body() jobData: jobData, @UploadedFile() image: Express.Multer.File) {
      console.log('PUT request received for job ', jobId)
      return this.jobsService.updateJobWithImage(jobId, jobData, image);
    }
}
