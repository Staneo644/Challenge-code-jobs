import { Document, Schema, Types } from 'mongoose';
import mongoose from 'mongoose';

export interface Job extends Document {
  money: number;
  status: 'actif' | 'expire' | 'a venir';
  description: string;
  domain: string;
  employer_email: string;
  enterprise_name: string;
  name: string;
  image: string;
  date: string;
}

export const JobSchema = new Schema<Job>({
  money: { type: Number, required: true },
  status: { type: String, enum: ['actif', 'expire', 'a venir'], required: true },
  description: { type: String, required: true },
  domain: { type: String, required: true },
  employer_email: { type: String, required: true },
  enterprise_name: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: String, required: true },
});

export const JobModel = mongoose.model<Job>('Job', JobSchema);
