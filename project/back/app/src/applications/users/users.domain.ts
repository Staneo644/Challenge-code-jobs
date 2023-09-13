import { Injectable } from '@nestjs/common';
import { EmployersDomain } from '../employers/employers.domain';
import { JobSeekersDomain } from '../job-seekers/job-seekers.domain';
import { Employer } from 'src/core/employers/employer.entity';
import { JobSeeker } from 'src/core/job-seekers/job-seeker.entity';
import { userEnum } from 'src/core/users/user.interfaces';


@Injectable()
export class UsersDomain {
    constructor (
        private readonly employersDomain: EmployersDomain, 
        private readonly jobSeekersDomain: JobSeekersDomain){}

    async createUser(user: Employer | JobSeeker): Promise<userEnum> {
        const res = await this.checkUser(user.email);
        console.log(res)
        if (res === userEnum.notExist) {
            if ( 'enterprise_name' in user) {
                const x = await this.employersDomain.createEmployer(user);
            
                return userEnum.isEmployer;
            }
            else {
                const x = await this.jobSeekersDomain.createJobSeeker(user);
            
                return userEnum.isJobSeeker;
            }
            
        }
        return res;
    }


   

    async getUsers(): Promise<{employers: Employer[], jobSeekers: JobSeeker[]}> {
        const employers = await this.employersDomain.getEmployers();
        const jobSeekers = await this.jobSeekersDomain.getAllJobSeekers();
        return {employers, jobSeekers};
    }
  
    async deleteUser(email: string) {
        const user = await this.checkUser(email);
        if (user === userEnum.isEmployer) {
            return this.employersDomain.deleteEmployer(email);
        }
        if (user === userEnum.isJobSeeker) {
            return this.jobSeekersDomain.deleteJobSeeker(email);
        }
        return user;
    }
  
    async checkUser(email: string): Promise<userEnum> {
        const employer = await this.employersDomain.getEmployer(email);
        if (employer){
            return (userEnum.isEmployer);
        }
        const jobSeeker = await this.jobSeekersDomain.getJobSeeker(email);
        if (jobSeeker){
            return (userEnum.isJobSeeker);
        }
        return (userEnum.notExist);
    }
}
