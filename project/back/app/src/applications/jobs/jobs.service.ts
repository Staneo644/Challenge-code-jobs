import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Job } from './job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async createJob(jobData: Partial<Job>): Promise<Job> {
    const job = this.jobRepository.create(jobData);
    return await this.jobRepository.save(job);
  }

  async updateJob(id: number, jobData: Partial<Job>): Promise<boolean> {
    let job = await this.getJobById(id);
    job.name = jobData.name;
    job.description = jobData.description;
    job.money = jobData.money;
    job.status = jobData.status;
    job.imageBuffer = jobData.imageBuffer;
    this.jobRepository.save(job)
    return true;
  }

  async deleteJob(id: number): Promise<DeleteResult> {
    return await this.jobRepository.delete(id);
  }

  async getJobById(id: number): Promise<Job> {
    return await this.jobRepository.findOne({
      where: {id},
      relations: ['interested_jobseekers', 'employer']
    });
  }

  async getJobs(): Promise<Job[]> {
    return await this.jobRepository.find(
      {relations: ['interested_jobseekers', 'employer']}
    );
  }
}