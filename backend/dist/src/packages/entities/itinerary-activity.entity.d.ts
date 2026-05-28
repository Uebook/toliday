import { TourPackage } from './tour-package.entity';
export declare class ItineraryActivity {
    id: string;
    day: number;
    title: string;
    description: string;
    inclusions: string[];
    images: string[];
    packageId: string;
    package: TourPackage;
    createdAt: Date;
    updatedAt: Date;
}
