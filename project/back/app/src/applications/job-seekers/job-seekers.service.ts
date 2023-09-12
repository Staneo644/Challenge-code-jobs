import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobSeekerModel } from 'src/core/job-seekers/job-seeker.entity';
import { JobSeeker } from 'src/core/job-seekers/job-seeker.entity';

@Injectable()
export class JobSeekersService {
 

  async createJobSeeker(jobSeekerData: Partial<JobSeeker>): Promise<JobSeeker> {
    const createdJobSeeker = new JobSeekerModel(jobSeekerData);
    return createdJobSeeker.save();
  }

  async findAllJobSeeker(): Promise<JobSeeker[]> {
    return JobSeekerModel.find().exec();
  }

  async findOneJobSeeker(email: string): Promise<JobSeeker | null> {
    return JobSeekerModel.findById(email).exec();
  }

  async updateJobSeeker(email: string, jobSeekerData: Partial<JobSeeker>): Promise<JobSeeker | null> {
    return JobSeekerModel.findByIdAndUpdate(email, jobSeekerData, { new: true }).exec();
  }

  async removeJobSeeker(email: string): Promise<void> {
    await JobSeekerModel.findByIdAndRemove(email).exec();
  }
}