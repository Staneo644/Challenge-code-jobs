import { Injectable } from '@nestjs/common';
import { Job, JobModel } from '../../core/jobs/job.entity';
import { JobsService } from './jobs.service';
import { EmployersDomain } from '../employers/employers.domain';
import { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class JobsDomain {

  constructor(
    private readonly jobsService: JobsService) {}


  async createJob( jobData: Job): Promise<Job> {
    const ret = await this.isJobExists(jobData.id);
    if (ret) {
        return null;
    }
    this.jobsService.createJob(jobData);
  }

  async updateJob(jobId: mongoose.Types.ObjectId, jobData: Job): Promise<Job> {
    const ret = await this.findJobById(jobData.id);
    if (!ret) {
        return null;
    }
    if (ret.employer_id !== jobData.employer_id) {
        return null;
    }

    this.jobsService.updateJob(jobId, jobData);
  }

  async isJobExists(jobId: mongoose.Types.ObjectId): Promise<boolean> {
    const job = await this.findJobById(jobId);
    return !!job;
    }

  async deleteJob(jobId: mongoose.Types.ObjectId): Promise<void> {
    const job = await this.isJobExists(jobId);
    if (job ===true) {
        await this.jobsService.deleteJob(jobId );
      }
    }

  async getJobsById(jobId: mongoose.Types.ObjectId []): Promise<Job[]> {
    let jobs: Job[] = [];
    for (let i = 0; i < jobId.length; i++) {
      const element = await this.findJobById(jobId[i]);
      jobs.push(element);
    }
    return jobs;
  }

  async findJobById(jobId: mongoose.Types.ObjectId): Promise<Job> {
    return await this.jobsService.findJobById(jobId);
  }

  async findAllJobs(): Promise<Job[]> {
    return await this.jobsService.findAllJobs();
  }

  async getEmployerJobs(employerId: string): Promise<Job[]> {
    return await this.jobsService.getEmployerJobs(employerId);
  }

}