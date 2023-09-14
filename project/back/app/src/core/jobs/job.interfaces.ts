import { Job } from '../../core/jobs/job.entity';
import * as mongoose from 'mongoose';

export interface IJobsService {
  createJob(jobData: Job): Promise<Job>;
  updateJob( jobId: mongoose.Types.ObjectId, jobData: Job): Promise<Job>;
  deleteJob( jobId: mongoose.Types.ObjectId): Promise<void>;
  findJobById(jobId: mongoose.Types.ObjectId): Promise<Job> 
  findAllJobs(): Promise<Job[]>;
  getEmployerJobs(employerId: string): Promise<Job[]>;
}