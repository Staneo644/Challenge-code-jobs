import { Test, TestingModule } from '@nestjs/testing';
import { EnterprisesController } from './enterprises.controller';

describe('EnterprisesController', () => {
  let controller: EnterprisesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnterprisesController],
    }).compile();

    controller = module.get<EnterprisesController>(EnterprisesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
