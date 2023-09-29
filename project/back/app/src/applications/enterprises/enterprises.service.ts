import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Enterprise } from './enterprise.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
  ) {}

  async createEnterprise(
    enterpriseData: Partial<Enterprise>,
  ): Promise<Enterprise> {
    const createdEnterprise = this.enterpriseRepository.create(enterpriseData);
    return await this.enterpriseRepository.save(createdEnterprise);
  }

  async getEnterprises(): Promise<Enterprise[]> {
    return await this.enterpriseRepository.find({ relations: ['employers'] });
  }

  async getEnterpriseById(id: number): Promise<Enterprise> {
    return await this.enterpriseRepository.findOne({
      where: { id },
      relations: ['employers'],
    });
  }

  async updateEnterprise(
    id: number,
    updateData: Partial<Enterprise>,
  ): Promise<boolean> {
    return (
      (await this.enterpriseRepository.update({ id }, updateData)).affected > 0
    );
  }

  async deleteEnterprise(id: number): Promise<boolean> {
    return (await this.enterpriseRepository.delete(id)).affected > 0;
  }
}
