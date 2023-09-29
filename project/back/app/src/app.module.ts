import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/database.module';
import { NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { CorsMiddleware } from './cors.middleware';
import { EmployersModule } from './applications/employers/employers.module';
import { JobsModule } from './applications/jobs/jobs.module';
import { EnterprisesModule } from './applications/enterprises/enterprises.module';
import { JobSeekersModule } from './applications/job-seekers/job-seekers.module';
import { UsersModule } from './applications/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    EnterprisesModule,
    EmployersModule,
    JobsModule,
    JobSeekersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
