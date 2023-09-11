
import { Document, Schema } from 'mongoose';
import { IsNotEmpty, IsEmail } from 'class-validator';
import  mongoose from 'mongoose';


export class Enterprise {
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is not valid' })
  email_patron: string;

  @IsNotEmpty({ message: 'title is required' })
  title: string;
}

export const EnterpriseSchema = new Schema<Enterprise>({
  email_patron: { type: String, required: true },
  title: { type: String, required: true, unique: true },
});

export const enterpriseModel = mongoose.model<Enterprise>('Enterprise', EnterpriseSchema);