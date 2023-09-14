import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';

  async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type',
  });

  const cors = require('cors');
  app.use(cors(
    {
      origin: 'http://localhost:8080',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type',
    }
  ))


  try {
    await mongoose.connect('mongodb://localhost:27017/test', {
 
  });
    await app.listen(3000);
    console.log('Application started and database connected.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

bootstrap();
