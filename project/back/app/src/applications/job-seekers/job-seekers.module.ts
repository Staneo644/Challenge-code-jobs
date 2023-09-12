import { Module } from '@nestjs/common';
import { JobSeekersController } from './job-seekers.controller';
import { JobSeekersService } from './job-seekers.service';
import { JobSeekersDomain } from './job-seekers.domain';

@Module({
  controllers: [JobSeekersController],
  providers: [JobSeekersService, JobSeekersDomain]
})
export class JobSeekersModule {}
