import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/database.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CorsMiddleware } from './cors.middleware'; // Créez un middleware CORS personnalisé
import { EmployersController } from './applications/employers/employers.controller';
const allowedOrigins = ['http://localhost:8080'];
import { EmployersModule } from './applications/employers/employers.module';
import { JobsModule } from './applications/jobs/jobs.module';

@Module({
  imports: [DatabaseModule, EmployersModule, JobsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware) // Utilisez le middleware CORS personnalisé ici
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // Autorisez CORS pour toutes les routes
  }
}