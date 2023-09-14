import { Document, Schema, Types } from 'mongoose';
import mongoose from 'mongoose';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class Employer {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is not valid' })
  email: string;

  @IsNotEmpty({ message: 'surname is required' })
  surname: string;

  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'enterprise_id is required' })
  enterprise_name: string;

  jobs: Types.ObjectId[];
}

export const EmployerSchema = new Schema<Employer>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  enterprise_name: { type: String, required: true },
  jobs: [{ type: Types.ObjectId, ref: 'Job' }]
});

export const EmployerModel = mongoose.model<Employer>('Employer', EmployerSchema);
