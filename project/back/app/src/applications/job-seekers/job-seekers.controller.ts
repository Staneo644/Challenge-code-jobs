import { Controller, Get, Post, Put, Delete, Param, Body, Options, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { JobSeekersDomain } from './job-seekers.domain';
import { JobSeeker } from '../../core/job-seekers/job-seeker.entity';
import { Response } from 'express';
import { Types } from 'mongoose';

@Controller('jobseekers')
export class JobSeekersController {
  constructor(private readonly jobSeekersService: JobSeekersDomain) {}

  @Get()
  findAll(): Promise<JobSeeker[]> {
    console.log('GET request received for all jobSeekers');

    return this.jobSeekersService.getAllJobSeekers();
  }

  @Get(':email')
  findOne(@Param('email') email: string): Promise<JobSeeker | undefined> {
    console.log('GET request received for jobSeeker: ', email);
    return this.jobSeekersService.getJobSeeker(email);
  }

  @Post(':email')
  @UsePipes(ValidationPipe)
  async seeing_job( @Param('email') email: string, @Body() JobId: any) {
    console.log('POST request received to validate job ', JobId.jobData)
    return this.jobSeekersService.addJob(JobId.jobData, email);
  }

  @Get('jobs/:email')
  async getJobs(@Param('email') email: string) {
    console.log('GET request received for all jobs of jobSeeker: ', email);
    return await this.jobSeekersService.getJobs(email)
    }

  
}