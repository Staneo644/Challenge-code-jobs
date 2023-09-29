import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { JobSeeker } from './job-seeker.entity';

@Injectable()
export class JobSeekersService {
  constructor(
    @InjectRepository(JobSeeker)
    private readonly jobSeekerRepository: Repository<JobSeeker>,
  ) {}

  async createJobSeeker(jobSeekerData: Partial<JobSeeker>): Promise<JobSeeker> {
    const createdJobSeeker = this.jobSeekerRepository.create(jobSeekerData);
    return await this.jobSeekerRepository.save(createdJobSeeker);
  }

  async getJobSeekers(): Promise<JobSeeker[]> {
    return await this.jobSeekerRepository.find();
  }

  async getJobSeekerByEmail(email: string): Promise<JobSeeker> {
    return await this.jobSeekerRepository.findOne({ where: { email } });
  }

  async getJobSeekerById(id: number): Promise<JobSeeker> {
    return await this.jobSeekerRepository.findOne({ where: { id } });
  }

  async updateJobSeeker(
    id: number,
    jobSeekerData: Partial<JobSeeker>,
  ): Promise<UpdateResult> {
    return await this.jobSeekerRepository.update(id, jobSeekerData);
  }

  async deleteJobSeeker(id: number): Promise<DeleteResult> {
    return await this.jobSeekerRepository.delete(id);
  }
}
