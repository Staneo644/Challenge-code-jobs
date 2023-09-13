import { Injectable } from '@nestjs/common';
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
    return await JobSeekerModel.findOne({ email }).exec();
  }

  async updateJobSeeker(email: string, jobSeekerData: Partial<JobSeeker>): Promise<JobSeeker | null> {
    return JobSeekerModel.findOneAndUpdate({email}, jobSeekerData, { new: true }).exec();
  }

  async removeJobSeeker(email: string){
    return await JobSeekerModel.findOneAndRemove({email}).exec();
  }
}