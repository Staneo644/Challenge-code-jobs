import { Controller, Delete } from '@nestjs/common';
import { EnterprisesDomain } from './enterprises.domain';
import { Enterprise } from '../../core/enterprises/enterprise.entity';
import { Body, Get, Param, Patch, Post, Options, Res } from '@nestjs/common';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';

@Controller('enterprises')
export class EnterprisesController {
  constructor(private readonly enterpriseService: EnterprisesDomain) {}


  @Options()
  handleOptions(@Res() res: Response) {
    console.log('OPTIONS request received for enterprises');
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.status(200).send(); // Respond with a 200 OK status for the OPTIONS request.
  }

    @Post()
    @UsePipes(ValidationPipe)
    async createEnterprise(@Body() enterpriseData: Enterprise): Promise<Enterprise> {
      console.log('POST request received for enterprise: ', enterpriseData);
      return this.enterpriseService.createEnterprise(enterpriseData);
    }

    @Get()
    async getEnterprises(): Promise<Enterprise[]> {
      console.log('GET request received for all enterprises');
      return this.enterpriseService.getEnterprises();
    }

    @Patch(':title')
    async updateEnterprise(
      @Param('title') title: string,
      @Body() updateData: Partial<Enterprise>,
    ): Promise<Enterprise> {
      console.log(`PATCH request received for title: ${title} with data: `, updateData);
      return this.enterpriseService.updateEnterprise(title, updateData);
    }

    @Delete(':title')
    async deleteEnterprise(@Param('title') title: string) {
      console.log(`DELETE request received for title: ${title}`);
      return this.enterpriseService.deleteEnterpriseTitle(title);
    }

}