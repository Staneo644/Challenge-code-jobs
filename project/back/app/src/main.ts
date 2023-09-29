import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
const AppDataSource = require('./shared/database/database.module');

console.log(`Application created, connecting to database ${process.env.DATABASEIP}`);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.get(Reflector);
  app.use(express.json({ limit: '5mb' }));
  const corsOptions = {
    origin: '*',
  };

  const cors = require('cors');

  app.enableCors(corsOptions);
  app.use(cors(corsOptions));
  
    if (AppDataSource.isInitialized === false)
      await AppDataSource.initialize();
  await app.init();
  await app.listen(3000);
}

bootstrap();
