import { Controller, Post, Put, Delete, Param, Body, Get, Res, Options, UsePipes, ValidationPipe } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';
import { Employer } from 'src/core/employers/employer.entity';
import { Response } from 'express';
import { EmployersDomain } from './employers.domain';
import { JobSeeker } from 'src/core/job-seekers/job-seeker.entity';

interface EmployerData {
  surname: string;
  name: string;
  email: string;
  // Ajoutez d'autres propriétés si nécessaire
}

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


  @Post()
  @UsePipes(ValidationPipe)
  createEmployer(@Body() employerJSON: Employer) {
    console.log('POST request received for employer: ', employerJSON);
    return this.employersService.createEmployer(employerJSON);
  }

  @Get()
  getEmployers() {
    console.log('GET request received for all employers');
    return this.employersService.getEmployers();
  }

  @Put(':employerId')
  updateEmployer(@Param('employerId') employerEmail: string, @Body() employerData: any) {
    console.log(`PUT request received for employer: ${employerEmail} with data: `, employerData);
    return this.employersService.updateEmployer(employerEmail, employerData);
  }

  @Delete(':employerId')
  deleteEmployer(@Param('employerId') employerEmail: string) {
    console.log(`DELETE request received for employer: ${employerEmail}`);
    return this.employersService.deleteEmployer(employerEmail);
  }

  @Get(':employerId')
  getEmployer(@Param('employerId') employerEmail: string) {
    console.log(`GET request received for employer: ${employerEmail}`);
    return this.employersService.getEmployer(employerEmail);
  }
}