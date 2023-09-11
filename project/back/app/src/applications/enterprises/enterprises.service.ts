import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    const enterprise = await enterpriseModel.findOne({ title }).exec();
    if (!enterprise) {
      throw new NotFoundException(`Entreprise avec le nom ${title} introuvable`);
    }
    return enterprise;
  }

  async deleteEnterprise(title: string): Promise<void> {
    const deletedEmployer = await enterpriseModel.findOneAndDelete({ title });
  
      if (!deletedEmployer) {
        throw new NotFoundException(`Enterprise with title ${title} not found`);
      }
  }
}
