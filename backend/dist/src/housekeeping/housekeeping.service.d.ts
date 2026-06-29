import { Repository } from 'typeorm';
import { Housekeeping, HousekeepingStatus } from './entities/housekeeping.entity';
export declare class HousekeepingService {
    private readonly housekeepingRepository;
    constructor(housekeepingRepository: Repository<Housekeeping>);
    findAll(hotelId: string): Promise<Housekeeping[]>;
    create(hotelId: string, data: {
        roomNumber: string;
        roomTypeId: string;
        status?: HousekeepingStatus;
        assignedStaffId?: string;
    }): Promise<Housekeeping>;
    update(id: string, hotelId: string, updateDto: {
        status?: HousekeepingStatus;
        assignedStaffId?: string;
        roomNumber?: string;
        roomTypeId?: string;
    }): Promise<Housekeeping>;
    remove(id: string, hotelId: string): Promise<void>;
}
