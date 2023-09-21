import { Injectable } from '@nestjs/common';
import { JobSeeker } from '../../core/job-seekers/job-seeker.entity';
import { JobSeekersService } from './job-seekers.service';
import { NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Types } from 'mongoose';
import { JobsDomain } from '../jobs/jobs.domain';
import { JobId } from 'src/core/jobs/job.entity';
import { IJobSeekersDomain } from '../../core/job-seekers/job-seeker.interfaces';
const mongoose = require('mongoose');

@Injectable()
export class JobSeekersDomain implements IJobSeekersDomain {
    constructor(private readonly jobSeekerService: JobSeekersService,
      private readonly jobDomain: JobsDomain
      ) {}


    async createJobSeeker(JobSeekerData: JobSeeker): Promise<JobSeeker> {
        const ret = await this.isJobSeeker(JobSeekerData.email);
        if (ret) {
            return(null)
        }
        return this.jobSeekerService.createJobSeeker(JobSeekerData);
    }

    async getAllJobSeekers(): Promise<JobSeeker[]> {
        return await this.jobSeekerService.findAllJobSeeker();
    }
  
    async updateJobSeeker(email: string, JobSeekerData: Partial<JobSeeker>): Promise<JobSeeker> {
        const ret = this.isJobSeeker(JobSeekerData.email);
        if (!ret) {
            return(null)
        }
        return await this.jobSeekerService.updateJobSeeker(email, JobSeekerData);
    }

    async isJobSeeker(email: string): Promise<boolean> {
        const ret = await this.jobSeekerService.findOneJobSeeker(email);
        if (!ret) {
            return false;
          }
        return true;
    }
  
    async deleteJobSeeker(email: string) : Promise<JobSeeker>{
        const ret = await this.getJobSeeker(email);
        for (let i = 0; i < ret.job_seeing.length; i++) {
            await this.jobDomain.deleteJob(ret.job_seeing[i]);
        }
        return await this.jobSeekerService.removeJobSeeker(email); 
    }  
    async getJobSeeker(email: string): Promise<JobSeeker | null> {
      return this.jobSeekerService.findOneJobSeeker(email);
    }

    async addJob(JobId: string, email: string): Promise<JobSeeker> {
        const ret = await this.getJobSeeker(email);
        if (!ret) {
            return(null)
        }
        ret.job_seeing.push(new Types.ObjectId(JobId));
        return await this.updateJobSeeker(email, ret)
    }

    async getJobs(email: string): Promise<JobId[]> {
        const jobSeeker = await this.getJobSeeker(email);
        if (!jobSeeker) {
            return null;
        }

        let result = [];
        const allJobs = await this.jobDomain.findAllJobs();
        for (let j = 0; j < allJobs.length; j++) {
            let jobExists = false;
            for (let i = 0; i < jobSeeker.job_seeing.length; i++) {
                if (jobSeeker.job_seeing[i].equals(allJobs[j]._id)) {
                    jobExists = true; 
                    break;
                }
            }
            if (!jobExists) {
                result.push(allJobs[j]);
            }
        }
    
        return result;
    }
  }