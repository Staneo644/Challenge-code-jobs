
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployersController } from './employers.controller';
import { EmployersService } from './employers.service';
import { EmployerSchema } from '../../core/employers/employer.entity';
import { JobsService } from '../jobs/jobs.service';
import { EmployersDomain } from './employers.domain';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Employer', schema: EmployerSchema }])],
  controllers: [EmployersController],
  providers: [EmployersService, JobsService, EmployersDomain],
})
export class EmployersModule {}