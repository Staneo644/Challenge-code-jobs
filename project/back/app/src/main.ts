import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

console.log(`Application created, connecting to database ${process.env.DATABASEIP}`);
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(bodyParser.json({ limit: '10mb' }));
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
    mongoose.connect('mongodb://172.18.0.2:27017', {})
      .then(() => console.log('Connected to database'))
      .catch((err) => console.log(err));

    await app.listen(3001);
    console.log(`Application started and database connected. Listening on port 3000 `);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

bootstrap();
