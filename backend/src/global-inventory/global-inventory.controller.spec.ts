import { Test, TestingModule } from '@nestjs/testing';
import { GlobalInventoryController } from './global-inventory.controller';

describe('GlobalInventoryController', () => {
  let controller: GlobalInventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalInventoryController],
    }).compile();

    controller = module.get<GlobalInventoryController>(GlobalInventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
