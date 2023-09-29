import { Injectable } from '@nestjs/common';
import { JobSeeker } from './job-seeker.entity';
import { JobSeekersService } from './job-seekers.service';
import { JobsDomain } from '../jobs/jobs.domain';
import { IJobSeekersDomain } from '../../interfaces/job-seekers/job-seeker.interfaces';
import { Job } from '../jobs/job.entity';

@Injectable()
export class JobSeekersDomain implements IJobSeekersDomain {
  constructor(
    private readonly jobSeekerService: JobSeekersService,
    private readonly jobDomain: JobsDomain,
  ) {}

  async createJobSeeker(JobSeekerData: any): Promise<boolean> {
    try {
      const ret = await this.isJobSeeker(JobSeekerData.email);
      if (ret) {
        return false;
      }
      return (
        (await this.jobSeekerService.createJobSeeker(JobSeekerData)) !== null
      );
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getJobSeekers(): Promise<JobSeeker[]> {
    return await this.jobSeekerService.getJobSeekers();
  }

  async updateJobSeeker(
    email: string,
    JobSeekerData: Partial<JobSeeker>,
  ): Promise<boolean> {
    try {
      const ret = await this.getJobSeekerByEmail(email);
      if (!ret) {
        return false;
      }
      return (
        (await this.jobSeekerService.updateJobSeeker(ret.id, JobSeekerData))
          .affected > 0
      );
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async isJobSeeker(email: string): Promise<boolean> {
    const ret = await this.getJobSeekerByEmail(email);
    if (!ret) {
      return false;
    }
    return true;
  }

  async deleteJobSeeker(email: string): Promise<boolean> {
    try {
      const ret = await this.getJobSeekerByEmail(email);
      if (!ret) {
        return false;
      }
      return (await this.jobSeekerService.deleteJobSeeker(ret.id)).affected > 0;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getJobSeekerByEmail(email: string): Promise<JobSeeker> {
    return this.jobSeekerService.getJobSeekerByEmail(email);
  }

  async addJob(
    JobId: number,
    email: string,
    validate: boolean,
  ): Promise<boolean> {
    try {
      const ret = await this.getJobSeekerByEmail(email);
      const job = await this.jobDomain.getJobById(JobId);
      if (!ret || !job) {
        return false;
      }
      if (!ret.jobSeeing) {
        ret.jobSeeing = [];
      }

      ret.jobSeeing.push(job.id);
      if (validate) {
        if (!job.interested_jobseekers) {
          job.interested_jobseekers = [];
        }
        job.interested_jobseekers.push(ret);
        this.jobDomain.updateJob(JobId, job);
      }
      return await this.updateJobSeeker(email, ret);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async getJobs(email: string): Promise<Job[]> {
    try {
      const jobSeeker = await this.getJobSeekerByEmail(email);
      if (!jobSeeker) {
        return null;
      }

      let result = [];
      const allJobs = await this.jobDomain.getJobs();
      for (let j = 0; j < allJobs.length; j++) {
        let jobExists = false;
        if (jobSeeker.jobSeeing) {
          for (let i = 0; i < jobSeeker.jobSeeing.length; i++) {
            if (jobSeeker.jobSeeing[i] === allJobs[j].id) {
              jobExists = true;
              break;
            }
          }
        }
        if (!jobExists) {
          result.push(allJobs[j]);
        }
      }
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
