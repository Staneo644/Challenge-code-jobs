import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersDomain } from './users.domain';
import { EmployersDomain } from '../employers/employers.domain';
import { JobSeekersDomain } from '../job-seekers/job-seekers.domain';
import { EmployersService } from '../employers/employers.service';
import { JobSeekersService } from '../job-seekers/job-seekers.service';
import { EmployersModule } from '../employers/employers.module';
import { JobSeekersModule } from '../job-seekers/job-seekers.module';
import { JobsService } from '../jobs/jobs.service';
import { EnterprisesService } from '../enterprises/enterprises.service';
import { EnterprisesDomain } from '../enterprises/enterprises.domain';
import { JobsDomain } from '../jobs/jobs.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from '../employers/employer.entity';
import { JobSeeker } from '../job-seekers/job-seeker.entity';
import { JobsModule } from '../jobs/jobs.module';
import { Job } from '../jobs/job.entity';
import { Enterprise } from '../enterprises/enterprise.entity';

@Module({
  imports: [
    EmployersModule,
    JobSeekersModule,
    TypeOrmModule.forFeature([Employer]),
    TypeOrmModule.forFeature([JobSeeker]),
    JobsModule,
    TypeOrmModule.forFeature([JobSeeker]),
    TypeOrmModule.forFeature([Job]),
    TypeOrmModule.forFeature([Enterprise]),
  ],
  controllers: [UsersController],
  providers: [
    UsersDomain,
    EmployersDomain,
    JobSeekersDomain,
    EmployersService,
    JobSeekersService,
    JobsService,
    EnterprisesService,
    EnterprisesDomain,
    JobsDomain,
    JobsService,
  ],
})
export class UsersModule {}
