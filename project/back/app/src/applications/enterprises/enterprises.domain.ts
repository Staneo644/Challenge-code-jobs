import { Injectable } from '@nestjs/common';
import { Enterprise, enterpriseModel } from '../../core/enterprises/enterprise.entity';
import { NotFoundException } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';

@Injectable()
export class EnterprisesDomain {
  constructor(private readonly enterpriseService: EnterprisesService) {}

  async createEnterprise(enterpriseData: Enterprise): Promise<Enterprise | null> {
    const res = await this.isEnterprise(enterpriseData.title);
    if (res) {
        //throw new NotFoundException(`Entreprise avec le nom ${enterpriseData.title} déjà existante`);
        return(null)
    }
    return this.enterpriseService.createEnterprise(enterpriseData);
  }

  async getEnterprises(): Promise<Enterprise[]> {
    return this.enterpriseService.getEnterprises();
  }

  async updateEnterprise(title: string, updateData: Partial<Enterprise>): Promise<Enterprise> {
    const res = await this.isEnterprise(title);
    if (!res) {
        throw new NotFoundException(`Entreprise avec le nom ${title} introuvable`);
    }
    return this.enterpriseService.updateEnterprise(title, updateData);
  }

  async getEnterpriseByTitle(title: string): Promise<Enterprise> {
    return this.enterpriseService.getEnterpriseByTitle(title);
  }

  async isEnterprise(title: string): Promise<boolean> {
    const enterprise = await this.enterpriseService.getEnterpriseByTitle(title);
    if (!enterprise) {
        return false;
      }
      return true;
}

  async deleteEnterpriseTitle(title: string): Promise<void> {
  
    this.enterpriseService.deleteEnterprise(title);
    
  }

  async deleteEnterprise(email: string): Promise<void> {
    const title = this.enterpriseService.getEnterpriseByTitle(email)
    if (title) {
        this.enterpriseService.deleteEnterprise(email);
    }
  }
}
