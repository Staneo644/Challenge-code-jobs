import { Injectable } from '@nestjs/common';
import { Job } from './job.entity';
import { JobsService } from './jobs.service';
import { JobSeeker } from '../job-seekers/job-seeker.entity';
import { EmployersDomain } from '../employers/employers.domain';

@Injectable()
export class JobsDomain  {
  constructor(
    private readonly jobsService: JobsService,
    private readonly employerDomain: EmployersDomain,
  ) {}

  async createJob(jobData: Job, email: string): Promise<any> {
    try {
      const employer = await this.employerDomain.getEmployerByEmail(email);
      if (!employer) {
        return false;
      }
      jobData.employer = employer;
      jobData.date = new Date();
      return (await this.jobsService.createJob(jobData)) !== null;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async updateJob(jobId: number, jobData: Job): Promise<boolean> {
    try {
      const ret = await this.getJobById(jobId);
      if (!ret) {
        return false;
      }

      return await this.jobsService.updateJob(jobId, jobData);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async deleteJob(jobId: number): Promise<boolean> {
    try {
      const job = await this.getJobById(jobId);
      if (!job) {
        return false;
      }
      return await this.jobsService.deleteJob(jobId);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getJobById(jobId: number): Promise<Job> {
    return await this.jobsService.getJobById(jobId);
  }

  async getJobs(): Promise<Job[]> {
    return await this.jobsService.getJobs();
  }
}
