import { Injectable, NotFoundException } from '@nestjs/common';
import { Job, JobModel } from '../../core/jobs/job.entity'; // Importez votre entité Job définie dans le core
import { JobsModule } from './jobs.module';
import { IJobsService } from 'src/core/jobs/job.interfaces';
import { ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

@Injectable()
export class JobsService implements IJobsService {


  async createJob( jobData: Job): Promise<Job> {
    const job = new JobModel(jobData);
    return await job.save();
  }

  async updateJob( jobId: mongoose.Types.ObjectId, jobData: Job): Promise<Job> {
    const job = await this.findJobById(jobId);
    Object.assign(job, jobData);
    return await job.save();
  }

  async deleteJob(jobId: mongoose.Types.ObjectId): Promise<void> {
    await JobModel.deleteOne({ _id: jobId }).exec();
    }

  async findJobById(jobId: mongoose.Types.ObjectId): Promise<Job> {
    try {
      return await JobModel.findById(jobId).exec();
    } catch (error) {
      throw new NotFoundException('Job not found.');
    }
  }

  async findAllJobs(): Promise<Job[]> {
    return await JobModel.find().exec();
  }

  async getEmployerJobs(employerId: string): Promise<Job[]> {
    return await JobModel.find({ employer_id: employerId }).exec();
  }
}