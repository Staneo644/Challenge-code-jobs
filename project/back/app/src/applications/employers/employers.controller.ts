import { Controller, Post, Put, Delete, Param, Body, Get, Res, Options, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { EmployersDomain } from './employers.domain';
import { Job, jobData } from 'src/core/jobs/job.entity';
import * as mongoose from 'mongoose';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersDomain) {}


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
  @UsePipes(ValidationPipe)
  createJob(@Param('employerEmail') employerEmail: string, @Body() jobData: jobData) {
      console.log('POST request received for job ', jobData)
      return this.employersService.addJobToEmployer(employerEmail, jobData);
  }

  @Get('jobs/:employerEmail')
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