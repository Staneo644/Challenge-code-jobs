import { Injectable } from '@nestjs/common';
import { Enterprise } from './enterprise.entity';
import { NotFoundException } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';

@Injectable()
export class EnterprisesDomain {
  constructor(private readonly enterpriseService: EnterprisesService) {}

  async createEnterprise(enterpriseData: Partial<Enterprise>): Promise<number> {
    try {
      const ret = await this.enterpriseService.createEnterprise(enterpriseData);
      if (ret === null || ret === undefined) {
        return 0;
      }
      return ret.id;
    } catch (error) {
      return 0;
    }
  }

  async getEnterprises(): Promise<Enterprise[]> {
    return this.enterpriseService.getEnterprises();
  }

  async getEnterpriseById(id: number): Promise<Enterprise | null> {
    try {
      const enterprise = await this.enterpriseService.getEnterpriseById(id);
      return enterprise;
    } catch (error) {
      return null;
    }
  }

  async updateEnterprise(
    id: number,
    updateData: Partial<Enterprise>,
  ): Promise<boolean> {
    try {
      const result = await this.enterpriseService.updateEnterprise(
        id,
        updateData,
      );
      return result;
    } catch (error) {
      return false;
    }
  }

  async deleteEnterprise(id: number): Promise<boolean> {
    try {
      const enterprise = await this.enterpriseService.getEnterpriseById(id);
      if (enterprise === null) {
        return false;
      }
      const result = await this.enterpriseService.deleteEnterprise(id);
      return result;
    } catch (error) {
      return false;
    }
  }
}
