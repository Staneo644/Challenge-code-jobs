import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersDomain } from './users.domain.service';
import { EmployersDomain } from '../employers/employers.domain';
import { JobSeekersDomain } from '../job-seekers/job-seekers.domain';
import { EmployersService } from '../employers/employers.service';
import { JobSeekersService } from '../job-seekers/job-seekers.service';
import { EmployersModule } from '../employers/employers.module';
import { JobSeekersModule } from '../job-seekers/job-seekers.module';
import { JobsService } from '../jobs/jobs.service';


@Module({
  controllers: [UsersController],
  providers: [UsersDomain, EmployersDomain, JobSeekersDomain, EmployersService, JobSeekersService, JobsService]
})
export class UsersModule {}
