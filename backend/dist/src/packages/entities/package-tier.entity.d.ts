import { TourPackage } from './tour-package.entity';
export declare class PackageTier {
    id: string;
    name: string;
    paxMin: number;
    paxMax: number;
    pricePerPerson: number;
    packageId: string;
    tourPackage: TourPackage;
    createdAt: Date;
    updatedAt: Date;
}
