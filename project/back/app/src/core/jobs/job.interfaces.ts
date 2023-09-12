import { Job } from '../../core/jobs/job.entity';

export interface IJobsService {
  createJob(employerId: string, jobData: any): Promise<Job>;
  updateJob(employerId: string, jobId: string, jobData: any): Promise<Job>;
  deleteJob(employerId: string, jobId: string): Promise<void>;
  findJobById(jobId: string): Promise<Job>;
  findAllJobs(): Promise<Job[]>;
  getEmployerJobs(employerId: string): Promise<Job[]>;
}