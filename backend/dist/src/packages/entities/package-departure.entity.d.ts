import { TourPackage } from './tour-package.entity';
export declare class PackageDeparture {
    id: string;
    date: string;
    totalSeats: number;
    availableSeats: number;
    isActive: boolean;
    packageId: string;
    tourPackage: TourPackage;
    createdAt: Date;
    updatedAt: Date;
}
