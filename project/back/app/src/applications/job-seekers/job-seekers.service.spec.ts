import { Test, TestingModule } from '@nestjs/testing';
import { JobSeekersService } from './job-seekers.service';

describe('JobSeekersService', () => {
  let service: JobSeekersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobSeekersService],
    }).compile();

    service = module.get<JobSeekersService>(JobSeekersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
