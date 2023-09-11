import { Test, TestingModule } from '@nestjs/testing';
import { EnterprisesService } from './enterprises.service';

describe('EnterprisesService', () => {
  let service: EnterprisesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnterprisesService],
    }).compile();

    service = module.get<EnterprisesService>(EnterprisesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
