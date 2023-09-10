import { Test, TestingModule } from '@nestjs/testing';
import { JobSeekersController } from './job-seekers.controller';

describe('JobSeekersController', () => {
  let controller: JobSeekersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobSeekersController],
    }).compile();

    controller = module.get<JobSeekersController>(JobSeekersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
