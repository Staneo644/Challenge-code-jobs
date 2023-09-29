import { Injectable } from '@nestjs/common';
import { EmployersDomain } from '../employers/employers.domain';
import { JobSeekersDomain } from '../job-seekers/job-seekers.domain';
import { Employer, createEmployer } from 'src/applications/employers/employer.entity';
import { JobSeeker } from '../job-seekers/job-seeker.entity';
import { userEnum } from 'src/interfaces/users/user.interfaces';
import { IUsersDomain } from 'src/interfaces/users/user.interfaces';

@Injectable()
export class UsersDomain implements IUsersDomain{
    constructor (
        private readonly employersDomain: EmployersDomain, 
        private readonly jobSeekersDomain: JobSeekersDomain){}

    async createUser(user: createEmployer | JobSeeker): Promise<userEnum> {
        try {

            const res = await this.checkUser(user.email);
            if (res === userEnum.notExist) {
                if ( 'enterprise_id' in user) {
                    

                    const ret = await this.employersDomain.createEmployer(user);
                    return (ret ? userEnum.isEmployer: userEnum.notExist);
                }
                else {
                    const ret = await this.jobSeekersDomain.createJobSeeker(user);
                    return (ret ? userEnum.isJobSeeker: userEnum.notExist)
                }
                
            }
            return res;
        }
        catch (e) {
            return userEnum.notExist;
        }
    }

    async updateUser(email: string, user: Employer | JobSeeker): Promise<boolean> {
        try {

            const param = await this.checkUser(email);
            
            if (user.email !== email) {
                const res2 = await this.checkUser(user.email);
                if (res2 !== userEnum.notExist) {
                    return false;
                }
            }
            
            if (param === userEnum.isEmployer) {
                return await this.employersDomain.updateEmployer(email, user);
            }
            if (param === userEnum.isJobSeeker) {
                return await this.jobSeekersDomain.updateJobSeeker(email, user);
            }
            return false;
    }
    catch (e) {
        return false;
    }
    }

   

    async getUsers(): Promise<{employers: Employer[], jobSeekers: JobSeeker[]}> {
        const employers = await this.employersDomain.getEmployers();
        const jobSeekers = await this.jobSeekersDomain.getJobSeekers();
        return {employers, jobSeekers};
    }
  
    async deleteUser(email: string):Promise<boolean> {
        const user = await this.checkUser(email);
        if (user === userEnum.isEmployer) {
            return this.employersDomain.deleteEmployer(email);
        }
        if (user === userEnum.isJobSeeker) {
            return this.jobSeekersDomain.deleteJobSeeker(email);
        }
        return false;
    }
  
    async checkUser(email: string): Promise<userEnum> {
        const employer = await this.employersDomain.isEmployer(email);
        if (employer){
            return (userEnum.isEmployer);
        }
        const jobSeeker = await this.jobSeekersDomain.isJobSeeker(email);
        if (jobSeeker){
            return (userEnum.isJobSeeker);
        }
        return (userEnum.notExist);
    }
}
