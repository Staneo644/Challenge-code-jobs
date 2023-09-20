import { Document, Schema, Types } from 'mongoose';
import mongoose from 'mongoose';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class JobSeeker {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is not valid' })
  email: string;

  @IsNotEmpty({ message: 'surname is required' })
  surname: string;

  @IsNotEmpty({ message: 'name is required' })
  name: string;

  job_seeing: Types.ObjectId[];
}

export const JobSeekerSchema = new Schema<JobSeeker>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  job_seeing: [{ type: Types.ObjectId, ref: 'Job' }],
});

export const JobSeekerModel = mongoose.model<JobSeeker>('JobSeeker', JobSeekerSchema);
