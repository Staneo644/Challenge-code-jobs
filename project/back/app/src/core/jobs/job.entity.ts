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
  image: string;
  date: string;
}

export class Job {

  constructor(data: jobData) {
    this.money = data.money;
    this.status = data.status;
    this.description = data.description;
    this.employer_email = data.employer_email;
    this.enterprise_name = data.enterprise_name;
    this.name = data.name;
    this.image = data.image;
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

  @IsNotEmpty({ message: 'enterprise_name is required' })
  enterprise_name: string;

  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'image is required' })
  image: string;

  @IsNotEmpty({ message: 'date is required' })
  date: string;
}

export class JobId extends Job {
  _id: Types.ObjectId;
}

export const JobSchema = new Schema<Job>({
  money: { type: Number, required: true },
  status: { type: String, enum: ['actif', 'expire', 'a venir'], required: true },
  description: { type: String, required: true },
  employer_email: { type: String, required: true },
  enterprise_name: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
});

export const JobModel = mongoose.model<Job>('Job', JobSchema);
