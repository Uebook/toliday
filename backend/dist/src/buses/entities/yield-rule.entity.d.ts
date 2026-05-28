import { Bus } from './bus.entity';
export declare class YieldRule {
    id: string;
    name: string;
    occupancyThreshold: number;
    surgePercentage: number;
    isActive: boolean;
    busId: string;
    bus: Bus;
    createdAt: Date;
    updatedAt: Date;
}
