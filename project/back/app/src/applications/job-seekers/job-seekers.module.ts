import { Module } from '@nestjs/common';
import { JobSeekersController } from './job-seekers.controller';
import { JobSeekersService } from './job-seekers.service';

@Module({
  controllers: [JobSeekersController],
  providers: [JobSeekersService]
})
export class JobSeekersModule {}
