
import { Module } from '@nestjs/common';
import { EmployersController } from './employers.controller';
import { EmployersService } from './employers.service';
import { JobsService } from '../jobs/jobs.service';
import { EmployersDomain } from './employers.domain';
import { EnterprisesService } from '../enterprises/enterprises.service';
import { EnterprisesDomain } from '../enterprises/enterprises.domain';
import { JobsDomain } from '../jobs/jobs.domain';
import { Employer } from './employer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterprisesModule } from '../enterprises/enterprises.module';
import { Enterprise } from '../enterprises/enterprise.entity';


@Module({
  imports: [ TypeOrmModule.forFeature([Employer]),
  EnterprisesModule, TypeOrmModule.forFeature([Enterprise])
   ],
  controllers: [EmployersController],
  providers: [EmployersService, EmployersDomain, EnterprisesService, EnterprisesDomain],
})
export class EmployersModule {}