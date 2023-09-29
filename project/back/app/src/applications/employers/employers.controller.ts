import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Get,
} from '@nestjs/common';
import { EmployersDomain } from './employers.domain';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersDomain) {}

  @Get()
  getEmployers() {
    console.log('GET request received for all employers');
    return this.employersService.getEmployers();
  }

  @Get(':employerEmail')
  getEmployer(@Param('employerEmail') employerEmail: string) {
    console.log(`GET request received for employer: ${employerEmail}`);
    return this.employersService.getEmployerByEmail(employerEmail);
  }

  @Get('jobs/:employerEmail')
  getEmployerJobs(@Param('employerEmail') employerEmail: string) {
    console.log(
      'GET request received for all jobs of employer ',
      employerEmail,
    );
    return this.employersService.getEmployerJobs(employerEmail);
  }

  @Get('jobs/images/:employerEmail')
  getEmployerJobsWithImage(@Param('employerEmail') employerEmail: string) {
    console.log(
      'GET request received for all jobs of employer ',
      employerEmail,
    );
    return this.employersService.getEmployerJobsWithImage(employerEmail);
  }
}
