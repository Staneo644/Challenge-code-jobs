import { Injectable } from '@nestjs/common';
import { Enterprise, enterpriseModel } from '../../core/enterprises/enterprise.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class EnterprisesService {
  

  async createEnterprise(enterpriseData: Partial<Enterprise>): Promise<Enterprise> {
    const createdEnterprise = new enterpriseModel(enterpriseData);
    return createdEnterprise.save();
  }

  async getEnterprises(): Promise<Enterprise[]> {
    return enterpriseModel.find().exec();
  }

  async updateEnterprise(title: string, updateData: Partial<Enterprise>): Promise<Enterprise> {
    return enterpriseModel.findOneAndUpdate({ title }, updateData, { new: true }).exec();
  }

  async getEnterpriseByTitle(title: string): Promise<Enterprise> {
    return await enterpriseModel.findOne({ title }).exec();
    
  }

  async getEnterpriseTitle(email: string): Promise<string | null> {
    const employer = await enterpriseModel.findOne({ email }).exec();
    if (employer) {
      return employer.title; 
    } else {
      return null;
    }
  }

  async deleteEnterprise(title: string): Promise<Enterprise> {
    return await enterpriseModel.findOneAndDelete({ title });
  }

  async getEnterprisesByEmail(email_patron: string): Promise<Enterprise[]> {
    return await enterpriseModel.find({ email_patron }).exec();
  }
}
