import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from '../../core/images/image.entity';

@Module({
  imports: [
    MulterModule.register({
      dest: './public/images', // Où les images seront stockées temporairement
    }),
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  providers: [ImageService],
  controllers: [ImageController]
})
export class ImageModule {}
