import { Injectable } from '@nestjs/common';
import { Employer, createEmployer, jobSendEmployer } from './employer.entity';
import { EmployersService } from './employers.service';
import { EnterprisesDomain } from '../enterprises/enterprises.domain';
import { EnterprisesService } from '../enterprises/enterprises.service';
import { IEmployersDomain } from '../../interfaces/employers/employer.interfaces';
import { Job } from '../jobs/job.entity';
import { JobsDomain } from '../jobs/jobs.domain';

@Injectable()
export class EmployersDomain implements IEmployersDomain {

  constructor (
    private readonly employerService: EmployersService,
    private readonly enterprisesDomain: EnterprisesDomain){}
    

    async createEmployer(employerData: createEmployer): Promise<boolean> {
        const res = await this.isEmployer(employerData.email);
        if (res) {
            return(null)
        }
        const enterprise = await this.enterprisesDomain.getEnterpriseById(Number(employerData.enterprise_id));
        if (enterprise) {
          let employer = new Employer();
          employer.email = employerData.email;
          employer.enterprise = enterprise;
          employer.name = employerData.name;
          employer.surname = employerData.surname;
          const ret = await this.employerService.createEmployer(employer);
          if (ret !== null)
            this.enterprisesDomain.updateEnterprise(enterprise.id, {employers: [...enterprise.employers, ret]});
          return(ret !== null);
        }
        return(null)
    }

    async getEmployers(): Promise<Employer[]> {
        return this.employerService.getEmployers();
    }
  
    async updateEmployer(email: string, employerData: Partial<Employer>): Promise<boolean> {
      try {
        const employer = await this.getEmployerByEmail(email);
        if (!employer) {
            return(false)
        }
        const ret = await this.employerService.updateEmployer(employer.id, employerData);
        return(ret);
      }
      catch (error) {
        return(false)
      }
    }

    async isEmployer(email: string): Promise<boolean> {
        const ret = await this.getEmployerByEmail(email);
        if (ret) {
          return true;
        }
        return false;
    }
  
    async deleteEmployer(email: string): Promise<boolean> {
      try {
        const employer = await this.getEmployerByEmail(email);
        if (employer === null) {
          return false;
        }
        if (employer.enterprise && employer.enterprise.employers.length === 1) {
          await this.enterprisesDomain.deleteEnterprise(employer.enterprise.id);
        }
        const ret = await this.employerService.deleteEmployer(employer.id);
        return ret;
      }
      catch (error) {
        return false;
      }
    }
  
    async getEmployerByEmail(email: string): Promise<Employer | null> {
      return this.employerService.getEmployerByEmail(email);
    }

    async getEmployerJobsWithImage(email:string): Promise<jobSendEmployer[]> {
      const Employer = await this.employerService.getEmployerJobsByEmail(email);
      let ret: jobSendEmployer[] = [];
      for (let i = 0; i < Employer.jobs.length; i++) {
        const job = Employer.jobs[i];
        let jobSend: jobSendEmployer = {
          name: job.name,
          description: job.description,
          money: job.money,
          status: job.status,
          interested_jobseekers: job.interested_jobseekers,
          imageBuffer: job.imageBuffer,
          id: job.id,
          date: job.date.toDateString(),
        }
        ret.push(jobSend);
      }
      return ret;
    }


    async getEmployerJobs(email: string): Promise<jobSendEmployer[]> {
      const ret = await this.getEmployerJobsWithImage(email);
      for (let i = 0; i < ret.length; i++) {
        ret[i].imageBuffer = null;
      }
      return ret;
    }

      
  }