import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { JobsDomain } from './jobs.domain';
import { Job } from './job.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from '../employers/employer.entity';
import { EmployersModule } from '../employers/employers.module';
import { EmployersDomain } from '../employers/employers.domain';
import { EmployersService } from '../employers/employers.service';
import { Enterprise } from '../enterprises/enterprise.entity';
import { EnterprisesModule } from '../enterprises/enterprises.module';
import { EnterprisesDomain } from '../enterprises/enterprises.domain';
import { EnterprisesService } from '../enterprises/enterprises.service';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), EmployersModule, TypeOrmModule.forFeature([Employer]), EnterprisesModule, TypeOrmModule.forFeature([Enterprise]), 
  EnterprisesModule, TypeOrmModule.forFeature([Enterprise])
],
  providers: [JobsService, JobsDomain, EmployersDomain, EmployersService, EnterprisesDomain, EnterprisesService],
  controllers: [JobsController]
})
export class JobsModule {}
