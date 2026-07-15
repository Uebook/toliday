export declare class CmsHero {
    id: string;
    title: string;
    subtitle: string;
    mediaUrl: string;
    ctaText: string;
    ctaLink: string;
    textColor: string;
    isActive: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CmsPromo {
    id: string;
    service: string;
    title: string;
    description: string;
    code: string;
    discount: string;
    imageUrl: string;
    link: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CmsDestination {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    isInternational: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CmsBlog {
    id: string;
    title: string;
    content: string;
    image: string;
    category: string;
    readTime: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class CmsPolicy {
    id: string;
    key: string;
    title: string;
    contentHtml: string;
    createdAt: Date;
    updatedAt: Date;
}
