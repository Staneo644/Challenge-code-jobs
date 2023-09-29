import { Controller, Delete } from '@nestjs/common';
import { EnterprisesDomain } from './enterprises.domain';
import { Enterprise } from './enterprise.entity';
import { Body, Get, Param, Patch, Post, Options, Res } from '@nestjs/common';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('enterprises')
export class EnterprisesController {
  constructor(private readonly enterpriseDomain: EnterprisesDomain) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createEnterprise(
    @Body() enterpriseData: Partial<Enterprise>,
  ): Promise<number> {
    console.log('POST request received for enterprise: ', enterpriseData);
    const ret = await this.enterpriseDomain.createEnterprise(enterpriseData);
    return ret;
  }

  @Get()
  async getEnterprises(): Promise<Enterprise[]> {
    console.log('GET request received for all enterprises');
    return await this.enterpriseDomain.getEnterprises();
  }

  @Get(':id')
  async getEnterpriseById(@Param('id') id: number): Promise<Enterprise | null> {
    console.log(`GET request received for id: ${id}`);
    return await this.enterpriseDomain.getEnterpriseById(id);
  }

  @Patch(':id')
  async updateEnterprise(
    @Param('id') id: number,
    @Body() updateData: Partial<Enterprise>,
  ): Promise<boolean> {
    console.log(`PATCH request received for id: ${id} with data: `, updateData);
    return await this.enterpriseDomain.updateEnterprise(id, updateData);
  }

  @Delete(':id')
  async deleteEnterprise(@Param('id') id: number): Promise<boolean> {
    console.log(`DELETE request received for id: ${id}`);
    return await this.enterpriseDomain.deleteEnterprise(id);
  }
}
