import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from '../../core/images/image.entity';

@Module({
  imports: [
 
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  providers: [ImageService],
  controllers: [ImageController]
})
export class ImageModule {}
