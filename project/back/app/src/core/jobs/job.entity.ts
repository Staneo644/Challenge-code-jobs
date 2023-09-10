import { Document, Schema, Types } from 'mongoose';
import mongoose from 'mongoose';

export interface Job extends Document {
  money: number;
  status: 'actif' | 'expire' | 'a venir';
  description: string;
  domain: string;
  employer_id: Types.ObjectId;
}

export const JobSchema = new Schema<Job>({
  money: { type: Number, required: true },
  status: { type: String, enum: ['actif', 'expire', 'a venir'], required: true },
  description: { type: String, required: true },
  domain: { type: String, required: true },
  employer_id: { type: Schema.Types.ObjectId, ref: 'Employer', required: true }
});

export const JobModel = mongoose.model<Job>('Job', JobSchema);
