import { Injectable } from '@nestjs/common';
import { Employer } from '../../core/employers/employer.entity';
import { EmployersService } from './employers.service';
import { EnterprisesDomain } from '../enterprises/enterprises.domain';
import { EnterprisesService } from '../enterprises/enterprises.service';
import { IEmployersDomain } from '../../core/employers/employer.interfaces';
import { Job, JobId } from 'src/core/jobs/job.entity';
import { JobsDomain } from '../jobs/jobs.domain';
import * as fs from 'fs/promises';
import * as mongoose from 'mongoose';

@Injectable()
export class EmployersDomain implements IEmployersDomain {

  constructor (
    private readonly employerService: EmployersService, 
    private readonly jobsDomain: JobsDomain,
    private readonly enterprisesDomain: EnterprisesDomain){}
    

    async createEmployer(employerData: Employer): Promise<Employer> {
        const res = await this.isEmployer(employerData.email);
        
        if (res) {
            return(null)
        }
        return this.employerService.createEmployer(employerData);
    }

    async getEmployers(): Promise<Employer[]> {
        return this.employerService.getEmployers();
    }
  
    async updateEmployer(email: string, employerData: Partial<Employer>): Promise<Employer> {
        const res = this.isEmployer(employerData.email);
        if (!res) {
            return(null)
        }
        console.log(employerData, email)
        if (employerData.email !== email) {
          const res2 = await this.enterprisesDomain.updateEnterpriseByEmail(email, employerData.email);
          if (!res2) {
            return(null)
          }
          console.log(res2)
          const ret = await this.getEmployer(email);
          const res3 = await this.jobsDomain.updateJobEmail(ret.jobs, employerData.email);
          if (!res3) {
            return(null)
          }
        }
        return this.employerService.updateEmployer(email, employerData);
    }

    async isEmployer(email: string): Promise<boolean> {
        const ret = await this.employerService.getEmployer(email);
        if (!ret) {
            return false;
          }
        return true;
    }
  
    async deleteEmployer(email: string): Promise<void> {
      const isExist = await this.isEmployer(email);
      if (isExist) {
        const ret = await this.enterprisesDomain.deleteEnterprise(email);
        return await this.employerService.deleteEmployer(email);
      }
    }
  
    async getEmployer(email: string): Promise<Employer | null> {
      return this.employerService.getEmployer(email);
    }

    async getEmployerJobs(email: string): Promise<Job[]> {
      const ret = await this.getEmployer(email);
      if (!ret) {
        return null;
      }
      
      return this.jobsDomain.getJobsById(ret.jobs);
    }

    async addJobToEmployer(email: string, jobData: Job): Promise<Employer> {
      const ret = await this.getEmployer(email);
      if (!ret) {
        return null;
      }
      const fs = require('fs');
      jobData.enterprise_name = ret.enterprise_name;
    
         const jobId:JobId = await this.jobsDomain.createJob(jobData);
         ret.jobs.push(jobId._id);
         return this.employerService.updateEmployer(email, ret);
    
     }

    async deleteJobFromEmployer(email: string, jobId: mongoose.Types.ObjectId): Promise<Employer> {
      const ret = await this.getEmployer(email);
      if (!ret) {
        return null;
      }
      const index = ret.jobs.indexOf(jobId);
      if (index > -1) {
        ret.jobs.splice(index, 1);
      }
      this.jobsDomain.deleteJob(jobId);
      return this.employerService.updateEmployer(email, ret);
    }
    
  }