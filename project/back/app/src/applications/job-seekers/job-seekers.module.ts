import { Module } from '@nestjs/common';
import { JobSeekersController } from './job-seekers.controller';
import { JobSeekersService } from './job-seekers.service';
import { JobSeekersDomain } from './job-seekers.domain';
import { JobsDomain } from '../jobs/jobs.domain';
import { JobsService } from '../jobs/jobs.service';

@Module({
  controllers: [JobSeekersController],
  providers: [JobSeekersService, JobSeekersDomain, JobsDomain, JobsService]
})
export class JobSeekersModule {}
