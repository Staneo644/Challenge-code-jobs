import { Controller, Get, Post, Put, Delete, Param, Body, Options, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { JobSeekersDomain } from './job-seekers.domain';
import { JobSeeker } from '../../core/job-seekers/job-seeker.entity';
import { Response } from 'express';

@Controller('jobseekers')
export class JobSeekersController {
  constructor(private readonly jobSeekersService: JobSeekersDomain) {}



  @Get()
  findAll(): Promise<JobSeeker[]> {
    console.log('GET request received for all jobSeekers');

    return this.jobSeekersService.getAllJobSeekers();
  }

  @Get(':id')
  findOne(@Param('id') email: string): Promise<JobSeeker | undefined> {
    console.log('GET request received for jobSeeker: ', email);
    return this.jobSeekersService.getJobSeeker(email);
  }

  @Put(':id')
  update(@Param('id') email: string, @Body() jobSeekerData: Partial<JobSeeker>): Promise<JobSeeker | undefined> {
    console.log('PUT request received for jobSeeker: ', email);
    return this.jobSeekersService.updateJobSeeker(email, jobSeekerData);
  }
}