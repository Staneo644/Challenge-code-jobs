import { Injectable } from '@nestjs/common';
import { Job, JobId, jobData } from '../../core/jobs/job.entity';
import { JobsService } from './jobs.service';
import * as mongoose from 'mongoose';
import { IJobsDomain } from '../../core/jobs/job.interfaces';

@Injectable()
export class JobsDomain implements IJobsDomain {

  constructor(
    private readonly jobsService: JobsService) {}


  async createJob( jobData: Job): Promise<any> {
    jobData.date = new Date();

    return await this.jobsService.createJob(jobData);
  }

  async updateJob(jobId: mongoose.Types.ObjectId, jobData: jobData): Promise<Job> {
    let ret = await this.findJobById(jobId);
    if (!ret) {
        return null;
    }
    ret.description = jobData.description;
    ret.name = jobData.name;
    ret.imageBuffer = jobData.imageBuffer;
    ret.imageType = jobData.imageType;
    ret.money = jobData.money;
    ret.status = jobData.status;
    this.jobsService.updateJob(jobId, jobData);
  }

  async updateJobEmail(jobId: mongoose.Types.ObjectId[], newEmail: string): Promise<boolean> {
    for (let i = 0; i < jobId.length; i++) {
      const element = await this.findJobById(jobId[i]);
      if (!element) {
        return false;
      }
      element.employer_email = newEmail;
      this.updateJob(jobId[i], element);
      return true;
    }
  }

  async updateJobEnterprise(jobId: mongoose.Types.ObjectId[], newEnterprise: string): Promise<boolean> {
    for (let i = 0; i < jobId.length; i++) {
      const element = await this.findJobById(jobId[i]);
      if (!element) {
        return false;
      }
      element.enterprise_name = newEnterprise;
      this.updateJob(jobId[i], element);
      return true;
    }
  }

  async updateJobInterested(jobId: mongoose.Types.ObjectId[], notInterested: string): Promise<void> {
    for (let i = 0; i < jobId.length; i++) {
      const element = await this.findJobById(jobId[i]);
      if (element && element.interested_jobseekers.includes(notInterested)) {
        element.interested_jobseekers.splice(element.interested_jobseekers.indexOf(notInterested), 1);
        this.updateJob(jobId[i], element);
      }
    }
  }

  async deleteJob(jobId: mongoose.Types.ObjectId): Promise<void> {
    const job = await this.findJobById(jobId);
    if (job) {
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

  async findJobById(jobId: mongoose.Types.ObjectId): Promise<JobId> {
    return await this.jobsService.findJobById(jobId);
  }

  async findAllJobs(): Promise<JobId[]> {
    return await this.jobsService.findAllJobs();
  }


  async getEmployerJobs(employerId: string): Promise<Job[]> {
    return await this.jobsService.getEmployerJobs(employerId);
  }

  async addJobSeeker(email: string, jobData: JobId): Promise<boolean> {
    const job = await this.findJobById(jobData._id);
    if (!job) {
      return false;
    }
    job.interested_jobseekers.push(email);
    this.updateJob(jobData._id, job);
    return true;
  }

}