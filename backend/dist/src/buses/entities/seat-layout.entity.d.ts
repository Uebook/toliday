import { Bus } from './bus.entity';
export declare enum DeckType {
    LOWER = "LOWER",
    UPPER = "UPPER"
}
export declare enum SeatType {
    SEATER = "SEATER",
    SLEEPER = "SLEEPER",
    SEMI_SLEEPER = "SEMI_SLEEPER"
}
export declare class SeatLayout {
    id: string;
    busId: string;
    bus: Bus;
    deck: DeckType;
    row: number;
    column: number;
    seatType: SeatType;
    seatName: string;
    isLadiesSeat: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
