import { Controller, Get, Post, Param, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { JobSeekersDomain } from './job-seekers.domain';
import { JobSeeker } from './job-seeker.entity';

@Controller('jobseekers')
export class JobSeekersController {
  constructor(private readonly jobSeekersService: JobSeekersDomain) {}

  @Get()
  getJobSeekers(): Promise<JobSeeker[]> {
    console.log('GET request received for all jobSeekers');

    return this.jobSeekersService.getJobSeekers();
  }

  @Get(':email')
  getJobSeekerByEmail(@Param('email') email: string): Promise<JobSeeker | undefined> {
    console.log('GET request received for jobSeeker: ', email);
    return this.jobSeekersService.getJobSeekerByEmail(email);
  }

  @Post(':email/:job')
  @UsePipes(ValidationPipe)
  async seeing_job( @Param('email') email: string, @Param('job') JobId: string, @Body() validate:any) {
    console.log('POST request received to validate job ', JobId)
    return this.jobSeekersService.addJob(Number(JobId), email, validate.validate);
  }

  @Get('jobs/:email')
  async getJobs(@Param('email') email: string) {
    console.log('GET request received for all jobs of jobSeeker: ', email);
    return await this.jobSeekersService.getJobs(email)
    }
}