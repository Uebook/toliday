import { Test, TestingModule } from '@nestjs/testing';
import { BusesService } from './buses.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BusVendor } from './entities/bus-vendor.entity';
import { Bus } from './entities/bus.entity';
import { BusRoute } from './entities/bus-route.entity';
import { BusSchedule } from './entities/bus-schedule.entity';
import { SeatLayout } from './entities/seat-layout.entity';
import { Crew } from './entities/crew.entity';
import { BusBooking } from './entities/bus-booking.entity';
import { YieldRule } from './entities/yield-rule.entity';

describe('BusesService', () => {
  let service: BusesService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusesService,
        { provide: getRepositoryToken(BusVendor), useValue: mockRepository },
        { provide: getRepositoryToken(Bus), useValue: mockRepository },
        { provide: getRepositoryToken(BusRoute), useValue: mockRepository },
        { provide: getRepositoryToken(BusSchedule), useValue: mockRepository },
        { provide: getRepositoryToken(SeatLayout), useValue: mockRepository },
        { provide: getRepositoryToken(Crew), useValue: mockRepository },
        { provide: getRepositoryToken(BusBooking), useValue: mockRepository },
        { provide: getRepositoryToken(YieldRule), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<BusesService>(BusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
