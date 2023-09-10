import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from '../../core/jobs/job.entity'; // Importez votre entité Job définie dans le core
import { JobsModule } from './jobs.module';
import { JobService } from 'src/core/jobs/job.interfaces';


@Injectable()
export class JobsService implements JobService {
  constructor(@InjectModel('Job') private readonly jobModel: Model<Job>) {}

  async createJob( jobData: any): Promise<Job> {
    // Créez une nouvelle instance de Job avec les données fournies
    const job = new this.jobModel(jobData);
    return await job.save();
  }

  async updateJob(employerId: string, jobId: string, jobData: JobsModule): Promise<Job> {
    const job = await this.findJobById(jobId);

    if (job.employer_id.toString() !== employerId) {
      throw new NotFoundException('Job not found for the specified employer.');
    }

    Object.assign(job, jobData);
    return await job.save();
  }

  async deleteJob(employerId: string, jobId: string): Promise<void> {
    const job = await this.findJobById(jobId);

    if (job.employer_id.toString() !== employerId) {
        throw new NotFoundException('Job not found for the specified employer.');
    }

    await this.jobModel.deleteOne({ _id: jobId }).exec();
    }

  async findJobById(jobId: string): Promise<Job> {
    try {
      return await this.jobModel.findById(jobId).exec();
    } catch (error) {
      throw new NotFoundException('Job not found.');
    }
  }

  async findAllJobs(): Promise<Job[]> {
    return await this.jobModel.find().exec();
  }

  async getEmployerJobs(employerId: string): Promise<Job[]> {
    return await this.jobModel.find({ employer_id: employerId }).exec();
  }

}