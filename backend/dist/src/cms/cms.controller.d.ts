import { CmsService } from './cms.service';
export declare class CmsController {
    private readonly cmsService;
    constructor(cmsService: CmsService);
    getHero(): Promise<import("./entities/cms.entity").CmsHero[]>;
    getPromos(service?: string): Promise<import("./entities/cms.entity").CmsPromo[]>;
    getDestinations(isInternational?: string): Promise<import("./entities/cms.entity").CmsDestination[]>;
    getBlogs(): Promise<import("./entities/cms.entity").CmsBlog[]>;
    getPolicy(key: string): Promise<import("./entities/cms.entity").CmsPolicy | null>;
    getAdminHeroes(): Promise<import("./entities/cms.entity").CmsHero[]>;
    createHero(data: any): Promise<Partial<import("./entities/cms.entity").CmsHero> & import("./entities/cms.entity").CmsHero>;
    updateHero(id: string, data: any): Promise<import("./entities/cms.entity").CmsHero | null>;
    deleteHero(id: string): Promise<import("typeorm").DeleteResult>;
    createPromo(data: any): Promise<Partial<import("./entities/cms.entity").CmsPromo> & import("./entities/cms.entity").CmsPromo>;
    updatePromo(id: string, data: any): Promise<import("./entities/cms.entity").CmsPromo | null>;
    deletePromo(id: string): Promise<import("typeorm").DeleteResult>;
    createDestination(data: any): Promise<Partial<import("./entities/cms.entity").CmsDestination> & import("./entities/cms.entity").CmsDestination>;
    updateDestination(id: string, data: any): Promise<import("./entities/cms.entity").CmsDestination | null>;
    deleteDestination(id: string): Promise<import("typeorm").DeleteResult>;
    createBlog(data: any): Promise<Partial<import("./entities/cms.entity").CmsBlog> & import("./entities/cms.entity").CmsBlog>;
    updateBlog(id: string, data: any): Promise<import("./entities/cms.entity").CmsBlog | null>;
    deleteBlog(id: string): Promise<import("typeorm").DeleteResult>;
    updatePolicy(key: string, title: string, contentHtml: string): Promise<import("./entities/cms.entity").CmsPolicy>;
}
