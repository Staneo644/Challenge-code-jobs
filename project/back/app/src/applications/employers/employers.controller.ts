import { Controller, Post, Put, Delete, Param, Body, Get, Res, Options, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { EmployersDomain } from './employers.domain';
import { Job } from 'src/core/jobs/job.entity';
import * as mongoose from 'mongoose';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersDomain) {}

  @Options()
  handleOptions(@Res() res: Response) {
    console.log('OPTIONS request received for employers');
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(200).send(); // Respond with a 200 OK status for the OPTIONS request.
  }

  @Get()
  getEmployers() {
    console.log('GET request received for all employers');
    return this.employersService.getEmployers();
  }
  
  @Put(':employerEmail')
  updateEmployer(@Param('employerEmail') employerEmail: string, @Body() employerData: any) {
    console.log(`PUT request received for employer: ${employerEmail} with data: `, employerData);
    return this.employersService.updateEmployer(employerEmail, employerData);
  }
  
  @Get(':employerEmail')
  getEmployer(@Param('employerEmail') employerEmail: string) {
    console.log(`GET request received for employer: ${employerEmail}`);
    return this.employersService.getEmployer(employerEmail);
  }
  
  @Post(':employerEmail')
    createJob(@Param('employerEmail') employerEmail: string, @Body() jobData: Job) {
      console.log('POST request received for job ', jobData)
      return this.employersService.addJobToEmployer(employerEmail, jobData);
  }

  @Get(':employerEmail/jobs')
  getEmployerJobs(@Param('employerEmail') employerEmail: string) {
    console.log('GET request received for all jobs of employer ', employerEmail)
    return this.employersService.getEmployerJobs(employerEmail);
  }
  
  @Delete(':employerEmail/:jobId')
  deleteJob(@Param('employerEmail') employerEmail: string, @Param('jobId') jobId: mongoose.Types.ObjectId) {
    console.log('DELETE request received for job ', jobId)
    return this.employersService.deleteJobFromEmployer(employerEmail, jobId);
  }
}