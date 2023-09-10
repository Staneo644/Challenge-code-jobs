import { Employer } from './employer.entity';

export interface EmployerService {

    createEmployer(employerData: Partial<Employer>): Promise<Employer>;

    updateEmployer(email: string, employerData: Partial<Employer>): Promise<Employer>;

    deleteEmployer(email: string): Promise<void>;

    getEmployer(email: string): Promise<Employer | null>;

    createJob(employerId: string, jobData: any): Promise<any>;

    updateJob(employerId: string, jobId: string, jobData: any): Promise<any>;

    deleteJob(employerId: string, jobId: string): void;

    getEmployerJobs(employerId: string): Promise<any>;
}