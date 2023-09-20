import { Document, Schema, Types } from 'mongoose';
import mongoose from 'mongoose';
import { IsNotEmpty, IsEmail } from 'class-validator';

export interface jobData {
  employer_email: string;
  money: number;
  status: 'actif' | 'expire' | 'a venir';
  description: string;
  enterprise_name: string;
  name: string;
  imageType: string;
  imageBuffer: string;
  date: Date;
  interested_jobseekers: string[];
}

export class Job {

  constructor(data: jobData) {
    this.money = data.money;
    this.status = data.status;
    this.description = data.description;
    this.employer_email = data.employer_email;
    this.enterprise_name = data.enterprise_name;
    this.name = data.name;
    this.imageType = data.imageType;
    this.imageBuffer = data.imageBuffer;
    this.date = data.date;
  }

  @IsNotEmpty({ message: 'money is required' })
  money: number;
  @IsNotEmpty({ message: 'status is required' })
  status: 'actif' | 'expire' | 'a venir';
  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is not valid' })
  employer_email: string;


  enterprise_name: string;

  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'image is required' })
  imageType: string;

  @IsNotEmpty({ message: 'buffer is required' })
  imageBuffer: string;

  interested_jobseekers: string[];

  date: Date;
}

export class JobId extends Job {
  _id: Types.ObjectId;
}

export const JobSchema = new Schema<Job>({
  money: { type: Number, required: true },
  status: { type: String, enum: ['actif', 'expire', 'a venir'], required: true },
  description: { type: String, required: true },
  employer_email: { type: String, required: true },
  enterprise_name: { type: String},
  name: { type: String, required: true },
  imageType: { type: String, required: true },
  imageBuffer: { type: String, required: true },
  date: { type: Date, required: true },
  interested_jobseekers: [{ type: String}],
});

export const JobModel = mongoose.model<Job>('Job', JobSchema);
