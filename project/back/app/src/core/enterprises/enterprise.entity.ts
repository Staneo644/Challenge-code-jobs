// core/enterprise/enterprise.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { Document } from 'mongoose';

@Schema()
export class Enterprise extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ unique: true })
  title: string;

 }

export const EnterpriseSchema = SchemaFactory.createForClass(Enterprise);