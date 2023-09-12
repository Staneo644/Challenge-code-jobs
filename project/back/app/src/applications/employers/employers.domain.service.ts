import { Injectable } from '@nestjs/common';
import { Employer } from '../../core/employers/employer.entity';
import { EmployersService } from './employers.service';
import { EnterprisesDomain } from '../enterprises/enterprises.domain.service';
import { EnterprisesService } from '../enterprises/enterprises.service';
import { IEmployersDomain } from '../../core/employers/employer.interfaces';

@Injectable()
export class EmployersDomain implements IEmployersDomain {
    private readonly enterprisesDomain: EnterprisesDomain;
    private readonly enterprisesService: EnterprisesService;
    constructor(private readonly employerService: EmployersService) {
        this.enterprisesDomain = new EnterprisesDomain(this.enterprisesService);
    }

    async createEmployer(employerData: Employer): Promise<Employer> {
        const res = await this.isEmployer(employerData.email);
        if (res) {
            return(null)
        }
        return this.employerService.createEmployer(employerData);
    }
  
    async updateEmployer(email: string, employerData: Partial<Employer>): Promise<Employer> {
        const res = this.isEmployer(employerData.email);
        if (!res) {
            return(null)
        }
        return this.employerService.updateEmployer(email, employerData);
    }

    async isEmployer(email: string): Promise<boolean> {
        const ret = await this.employerService.getEmployer(email);
        if (!ret) {
            return false;
          }
        return true;
    }
  
    async deleteEmployer(email: string): Promise<void> {
      const isExist = await this.isEmployer(email);
      if (isExist) {
        this.enterprisesDomain.deleteEnterprise(email);
        const deletedEmployer = await this.employerService.deleteEmployer(email);
      }
    }
  
    async getEmployer(email: string): Promise<Employer | null> {
      return this.employerService.getEmployer(email);
    }
  }