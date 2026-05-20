import { Test, TestingModule } from '@nestjs/testing';
import { BusesController } from './buses.controller';
import { BusesService } from './buses.service';

describe('BusesController', () => {
  let controller: BusesController;

  const mockBusesService = {
    findAllVendors: jest.fn(),
    findVendorById: jest.fn(),
    createVendor: jest.fn(),
    updateVendor: jest.fn(),
    findBusesByVendor: jest.fn(),
    createBus: jest.fn(),
    findAllRoutes: jest.fn(),
    createRoute: jest.fn(),
    findSchedulesByRoute: jest.fn(),
    createSchedule: jest.fn(),
    findSeatLayout: jest.fn(),
    saveSeatLayout: jest.fn(),
    findCrewByVendor: jest.fn(),
    createCrewMember: jest.fn(),
    findBookingsBySchedule: jest.fn(),
    createBooking: jest.fn(),
    findYieldRulesByBus: jest.fn(),
    createYieldRule: jest.fn(),
    getStats: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusesController],
      providers: [
        { provide: BusesService, useValue: mockBusesService },
      ],
    }).compile();

    controller = module.get<BusesController>(BusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
