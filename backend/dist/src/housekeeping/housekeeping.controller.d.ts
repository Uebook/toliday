import { HousekeepingService } from './housekeeping.service';
import { HousekeepingStatus } from './entities/housekeeping.entity';
export declare class HousekeepingController {
    private readonly housekeepingService;
    constructor(housekeepingService: HousekeepingService);
    findAll(req: any): Promise<import("./entities/housekeeping.entity").Housekeeping[]>;
    create(req: any, body: {
        roomNumber: string;
        roomTypeId: string;
        status?: HousekeepingStatus;
        assignedStaffId?: string;
    }): Promise<import("./entities/housekeeping.entity").Housekeeping>;
    update(req: any, id: string, body: {
        status?: HousekeepingStatus;
        assignedStaffId?: string;
        roomNumber?: string;
        roomTypeId?: string;
    }): Promise<import("./entities/housekeeping.entity").Housekeeping>;
    remove(req: any, id: string): Promise<void>;
}
