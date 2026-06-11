import { Test, TestingModule } from '@nestjs/testing';
import { GlobalInventoryService } from './global-inventory.service';

describe('GlobalInventoryService', () => {
  let service: GlobalInventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalInventoryService],
    }).compile();

    service = module.get<GlobalInventoryService>(GlobalInventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
