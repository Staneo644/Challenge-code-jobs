import { Controller, Post, Put, Delete, Param, Body, Get } from '@nestjs/common';
import { EmployersService } from './employers.service';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Post()
  createEmployer(@Body() employerData: any) {
    return this.employersService.createEmployer(employerData);
  }

  @Put(':employerId')
  updateEmployer(@Param('employerId') employerEmail: string, @Body() employerData: any) {
    return this.employersService.updateEmployer(employerEmail, employerData);
  }

  @Delete(':employerId')
  deleteEmployer(@Param('employerId') employerEmail: string) {
    return this.employersService.deleteEmployer(employerEmail);
  }

  @Get(':employerId')
  getEmployer(@Param('employerId') employerEmail: string) {
    return this.employersService.getEmployer(employerEmail);
  }
}