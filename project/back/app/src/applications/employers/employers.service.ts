import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Employer } from './employer.entity';

@Injectable()
export class EmployersService {
  constructor(
    @InjectRepository(Employer)
    private readonly employerRepository: Repository<Employer>,
  ) {}

  async createEmployer(employerData: Partial<Employer>): Promise<Employer> {
    const employer = this.employerRepository.create(employerData);
    return await this.employerRepository.save(employer);
  }

  async getEmployers(): Promise<Employer[]> {
    return await this.employerRepository.find({
      relations: ['enterprise', 'jobs'],
    });
  }

  async getEmployerJobsByEmail(email: string): Promise<Employer> {
    return await this.employerRepository
      .createQueryBuilder('employer')
      .where('employer.email = :email', { email })
      .leftJoinAndSelect('employer.enterprise', 'enterprise')
      .leftJoinAndSelect('employer.jobs', 'jobs')
      .leftJoinAndSelect('jobs.interested_jobseekers', 'interested_jobseekers')
      .getOne();
  }

  async updateEmployer(
    id: number,
    employerData: Partial<Employer>,
  ): Promise<boolean> {
    return (
      (await this.employerRepository.update(id, employerData)).affected > 0
    );
  }

  async deleteEmployer(id: number): Promise<boolean> {
    return (await this.employerRepository.delete(id)).affected > 0;
  }

  async getEmployerById(id: number): Promise<Employer> {
    return await this.employerRepository.findOne({ where: { id } });
  }

  async getEmployerByEmail(email: string): Promise<Employer> {
    return await this.employerRepository.findOne({
      where: { email },
      relations: ['enterprise'],
    });
  }
}
