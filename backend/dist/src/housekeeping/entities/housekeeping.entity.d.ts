import { Staff } from '../../staff/entities/staff.entity';
import { RoomType } from '../../room-type/entities/room-type.entity';
export declare enum HousekeepingStatus {
    CLEAN = "CLEAN",
    DIRTY = "DIRTY",
    MAINTENANCE = "MAINTENANCE",
    OUT_OF_ORDER = "OUT_OF_ORDER"
}
export declare class Housekeeping {
    id: string;
    hotelId: string;
    roomNumber: string;
    roomTypeId: string;
    roomType: RoomType;
    status: HousekeepingStatus;
    assignedStaffId: string;
    assignedStaff: Staff;
    createdAt: Date;
    updatedAt: Date;
}
