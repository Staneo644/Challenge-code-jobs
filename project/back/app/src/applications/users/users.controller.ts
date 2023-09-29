import {
  Controller,
  Get,
  Delete,
  Param,
  Options,
  Res,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersDomain } from './users.domain';
import {
  Employer,
  createEmployer,
} from 'src/applications/employers/employer.entity';
import { JobSeeker } from 'src/applications/job-seekers/job-seeker.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersDomain) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() employerJSON: createEmployer | JobSeeker) {
    console.log('POST request received for user: ', employerJSON);
    return this.usersService.createUser(employerJSON);
  }

  @Get()
  findAllUsers() {
    console.log('GET request received for all users');
    return this.usersService.getUsers();
  }

  @Delete(':email')
  deleteUser(@Param('email') email: string) {
    console.log(`DELETE request received for user: ${email}`);
    return this.usersService.deleteUser(email);
  }

  @Put(':email')
  updateUser(
    @Param('email') email: string,
    @Body() userJSON: Employer | JobSeeker,
  ) {
    console.log(`PUT request received for user: ${email}`);
    return this.usersService.updateUser(email, userJSON);
  }

  @Get(':email')
  checkUser(@Param('email') email: string) {
    console.log(`GET request received for user: ${email}`);
    return this.usersService.checkUser(email);
  }
}
