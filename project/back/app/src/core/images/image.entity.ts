import * as mongoose from 'mongoose';

export class Image {
    name: string;
    description: string;
    filename: string;
    path: string;
}


export const ImageSchema = new mongoose.Schema({
  name: String,
  description: String,
  filename: String,
  path: String,
});