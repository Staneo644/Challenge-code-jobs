import { Employer } from '../employers/employer.entity';
import { JobSeeker } from '../job-seekers/job-seeker.entity';

export enum userEnum {
  notExist = 'notExist',
  isJobSeeker = 'isJobSeeker',
  isEmployer = 'isEmployer',
};

export interface IUsersDomain {
  
  createUser(user: Employer | JobSeeker): Promise<userEnum>;
  
  updateUser(email: string, user: Employer | JobSeeker): Promise<JobSeeker | Employer | null>;
  
  getUsers(): Promise<{ employers: Employer[]; jobSeekers: JobSeeker[] }>;
  
  deleteUser(email: string): Promise<any>;
  
  checkUser(email: string): Promise<userEnum>;
}