import { Staff } from './staff.entity';
export declare class Attendance {
    id: string;
    staffId: string;
    staff: Staff;
    hotelId: string;
    clockIn: Date;
    clockOut: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
