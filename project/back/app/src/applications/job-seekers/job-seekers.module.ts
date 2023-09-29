import { Module } from '@nestjs/common';
import { JobSeekersController } from './job-seekers.controller';
import { JobSeekersService } from './job-seekers.service';
import { JobSeekersDomain } from './job-seekers.domain';
import { JobsDomain } from '../jobs/jobs.domain';
import { JobsService } from '../jobs/jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeeker } from './job-seeker.entity';
import { JobsModule } from '../jobs/jobs.module';
import { Job } from '../jobs/job.entity';
import { EmployersModule } from '../employers/employers.module';
import { Employer } from '../employers/employer.entity';
import { EmployersDomain } from '../employers/employers.domain';
import { EmployersService } from '../employers/employers.service';
import { EnterprisesDomain } from '../enterprises/enterprises.domain';
import { EnterprisesModule } from '../enterprises/enterprises.module';
import { EnterprisesService } from '../enterprises/enterprises.service';
import { Enterprise } from '../enterprises/enterprise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobSeeker]),
    TypeOrmModule.forFeature([Job]),
    JobsModule,
    EmployersModule,
    TypeOrmModule.forFeature([Employer]),
    EnterprisesModule,
    TypeOrmModule.forFeature([Enterprise]),
  ],
  controllers: [JobSeekersController],
  providers: [
    JobSeekersService,
    JobSeekersDomain,
    JobsDomain,
    JobsService,
    EmployersDomain,
    EmployersService,
    EnterprisesDomain,
    EnterprisesService,
  ],
})
export class JobSeekersModule {}
