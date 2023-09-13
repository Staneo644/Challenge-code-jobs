import { Injectable } from '@nestjs/common';
import { JobSeeker } from '../../core/job-seekers/job-seeker.entity';
import { JobSeekersService } from './job-seekers.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class JobSeekersDomain {
    constructor(private readonly jobSeekerService: JobSeekersService) {}

    async createJobSeeker(JobSeekerData: JobSeeker): Promise<JobSeeker> {
        const ret = await this.isJobSeeker(JobSeekerData.email);
        if (ret) {
            return(null)
        }
        return this.jobSeekerService.createJobSeeker(JobSeekerData);
    }

    async getAllJobSeekers(): Promise<JobSeeker[]> {
        return this.jobSeekerService.findAllJobSeeker();
    }
  
    async updateJobSeeker(email: string, JobSeekerData: Partial<JobSeeker>): Promise<JobSeeker> {
        const ret = this.isJobSeeker(JobSeekerData.email);
        if (!ret) {
            return(null)
        }
        return this.jobSeekerService.updateJobSeeker(email, JobSeekerData);
    }

    async isJobSeeker(email: string): Promise<boolean> {
        const ret = await this.jobSeekerService.findOneJobSeeker(email);
        if (!ret) {
            return false;
          }
        return true;
    }
  
    async deleteJobSeeker(email: string) {
      return await this.jobSeekerService.removeJobSeeker(email); 
    }
  
    async getJobSeeker(email: string): Promise<JobSeeker | null> {
      return this.jobSeekerService.findOneJobSeeker(email);
    }
  }