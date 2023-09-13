
import { Controller, Get, Delete, Param, Options, Res, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { Response } from 'express';
import { UsersDomain } from './users.domain';
import { Employer } from 'src/core/employers/employer.entity';
import { JobSeeker } from 'src/core/job-seekers/job-seeker.entity';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersDomain) {}

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
    createUser(@Body() employerJSON: Employer | JobSeeker) {
        console.log('POST request received for user: ', employerJSON);
        return this.usersService.createUser(employerJSON);
    }
    
    @Get()
    findAllUsers() {
      console.log('GET request received for all users');
      return this.usersService.getUsers();
    }
  
    @Post(':email')
    deleteUser(@Param('email') email: string) {
      console.log(`DELETE request received for user: ${email}`);
      return this.usersService.deleteUser(email);
    }
  
    @Get(':email')
    checkUser(@Param('email') email: string) {
      console.log(`GET request received for user: ${email}`);
      return this.usersService.checkUser(email);
    }
}
