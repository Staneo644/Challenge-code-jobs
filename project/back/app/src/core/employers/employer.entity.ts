import { Document, Schema, Types } from 'mongoose';
import mongoose from 'mongoose';

export interface Employer extends Document {
  email: string;
  name: string;
  enterprise_id: Types.ObjectId; // Référence à l'ID de l'employeur
}

export const EmployerSchema = new Schema<Employer>({
  email: { type: String, required: true },
  name: { type: String, required: true },
  enterprise_id: { type: Schema.Types.ObjectId, ref: 'Enterprise', required: true }
});

// Le modèle Mongoose pour l'entité Job
export const JobModel = mongoose.model<Employer>('Employer', EmployerSchema);
