import { Controller, Get, Post, Put, Delete, Param, Body, Options, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { JobSeekersDomain } from './job-seekers.domain';
import { JobSeeker } from '../../core/job-seekers/job-seeker.entity';
import { Response } from 'express';

@Controller('jobseekers')
export class JobSeekersController {
  constructor(private readonly jobSeekersService: JobSeekersDomain) {}


  @Options()
  handleOptions(@Res() res: Response) {
    console.log('OPTIONS request received for jobSeekers');
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(200).send(); // Respond with a 200 OK status for the OPTIONS request.
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() jobSeekerData: JobSeeker): Promise<JobSeeker> {
    console.log('POST request received for jobSeeker: ', jobSeekerData);
    return this.jobSeekersService.createJobSeeker(jobSeekerData);
  }

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

  @Delete(':id')
  remove(@Param('id') email: string): Promise<void> {
    console.log('DELETE request received for jobSeeker: ', email);
    return this.jobSeekersService.deleteJobSeeker(email);
  }
}