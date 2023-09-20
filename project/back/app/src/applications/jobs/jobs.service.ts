import { Injectable, NotFoundException } from '@nestjs/common';
import { Job, JobId, JobModel } from '../../core/jobs/job.entity'; 
import { JobsModule } from './jobs.module';
import { IJobsService } from 'src/core/jobs/job.interfaces';
import { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class JobsService implements IJobsService {


  async createJob( jobData: Job): Promise<any> {
    const job = new JobModel(jobData);
    return await job.save();
  }

  async updateJob( jobId: mongoose.Types.ObjectId, jobData: Job): Promise<JobId> {
    return JobModel.findOneAndUpdate({ _id: jobId }, jobData, { new: true })
  }

  async deleteJob(jobId: mongoose.Types.ObjectId): Promise<void> {
    await JobModel.deleteOne({ _id: jobId }).exec();
    }

  async findJobById(jobId: mongoose.Types.ObjectId): Promise<JobId> {
    try {
      return await JobModel.findById(jobId).exec();
    } catch (error) {
      throw new NotFoundException('Job not found.');
    }
  }

  async findAllJobs(): Promise<JobId[]> {
    return await JobModel.find().exec();
  }


  async getEmployerJobs(employerId: string): Promise<Job[]> {
    return await JobModel.find({ employer_id: employerId }).exec();
  }
}