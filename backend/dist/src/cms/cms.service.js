"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cms_entity_1 = require("./entities/cms.entity");
let CmsService = class CmsService {
    heroRepository;
    promoRepository;
    destinationRepository;
    blogRepository;
    policyRepository;
    constructor(heroRepository, promoRepository, destinationRepository, blogRepository, policyRepository) {
        this.heroRepository = heroRepository;
        this.promoRepository = promoRepository;
        this.destinationRepository = destinationRepository;
        this.blogRepository = blogRepository;
        this.policyRepository = policyRepository;
    }
    async onModuleInit() {
        await this.seedHero();
        await this.seedPromos();
        await this.seedDestinations();
        await this.seedBlogs();
        await this.seedPolicies();
    }
    async seedHero() {
        const count = await this.heroRepository.count();
        if (count === 0) {
            await this.heroRepository.save({
                title: 'Enjoy up to 70% off at Duty-Free',
                subtitle: 'Shop fragrances, cosmetics & spirits before you fly.',
                mediaUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200',
                ctaText: 'Shop Duty-Free',
                ctaLink: 'duty-free',
                textColor: '#ffffff',
                isActive: true,
                sortOrder: 0,
            });
            await this.heroRepository.save({
                title: 'Save up to ₹1,500 on Flights',
                subtitle: 'Use code DBSDOME12 at checkout.',
                mediaUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200',
                ctaText: 'Search Flights',
                ctaLink: 'flights',
                textColor: '#ffffff',
                isActive: true,
                sortOrder: 1,
            });
        }
    }
    async seedPromos() {
        const count = await this.promoRepository.count();
        if (count === 0) {
            const defaultPromos = [
                { service: 'home', title: '21st Birthday Sale', description: 'Hotels, Flights, Activities.', code: 'BASH21', discount: 'Up to 60% off', imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400', link: 'hotels', isActive: true },
                { service: 'home', title: 'Experience True Hospitality', description: 'Exceptional stays around the country.', code: 'RADISSON', discount: 'Flat 20% off', imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400', link: 'hotels', isActive: true },
                { service: 'flights', title: 'Mega Flight Sale', description: 'On Domestic Flights.', code: 'FLYBIG', discount: 'Flat 15% Off', imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=400', link: 'flights', isActive: true },
                { service: 'bus', title: 'Summer Bus Sale', description: 'On AC Sleeper Buses.', code: 'BUSCOOL', discount: 'Up to ₹500 off', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400', link: 'bus', isActive: true },
                { service: 'cab', title: 'Outstation Roadtrip Special', description: 'Explore cities with top rated drivers.', code: 'CABGO', discount: 'Save ₹300', imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400', link: 'cab', isActive: true }
            ];
            await this.promoRepository.save(defaultPromos);
        }
    }
    async seedDestinations() {
        const count = await this.destinationRepository.count();
        if (count === 0) {
            const defaultDestinations = [
                { name: 'Kashmir', description: 'Paradise on Earth', imageUrl: 'https://images.unsplash.com/photo-1566837430227-f8863f6ed930?auto=format&fit=crop&q=80&w=600', isInternational: false },
                { name: 'Goa', description: 'Sun, Sand & Beaches', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600', isInternational: false },
                { name: 'Kerala', description: 'God\'s Own Country', imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=600', isInternational: false },
                { name: 'Paris', description: 'City of Love', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600', isInternational: true },
                { name: 'Bali', description: 'Island of Gods', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600', isInternational: true }
            ];
            await this.destinationRepository.save(defaultDestinations);
        }
    }
    async seedBlogs() {
        const count = await this.blogRepository.count();
        if (count === 0) {
            const defaultBlogs = [
                { title: 'Skip Airport Queues Like a Pro With This Little-Known Hack', content: 'Airport queues can be extremely frustrating, especially during holidays. By checking in online 24 hours prior and booking airport VIP fast-track services, you can breeze past long queues.', image: 'https://images.unsplash.com/photo-1530521951415-340479d0263f?auto=format&fit=crop&q=80&w=600', category: 'Travel Hacks', readTime: '4 min read', status: 'published' },
                { title: 'Top 15 Places to Visit in May in India', content: 'From the cool valleys of Shimla to the pristine tea gardens of Munnar, discover the best spots to escape the summer heat in India during the month of May.', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600', category: 'Destinations', readTime: '6 min read', status: 'published' },
                { title: '10 Best Places to Visit in February in India', content: 'February brings the perfect weather for exploring Rajasthan\'s royal forts, experiencing the Rann Utsav in Kutch, or enjoying snowfall in Gulmarg.', image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&q=80&w=600', category: 'Destinations', readTime: '5 min read', status: 'published' }
            ];
            await this.blogRepository.save(defaultBlogs);
        }
    }
    async seedPolicies() {
        const count = await this.policyRepository.count();
        if (count === 0) {
            const defaultPolicies = [
                {
                    key: 'privacy',
                    title: 'Privacy Policy',
                    contentHtml: '<p>Your privacy is important to us. It is TolidayTrip\'s policy to respect your privacy regarding any information we may collect from you across our website.</p>'
                },
                {
                    key: 'refund',
                    title: 'Refund & Cancellation Policy',
                    contentHtml: '<p>Cancellations made 24 hours or more before the scheduled departure/check-in are eligible for a 100% refund. Cancellations made within 24 hours are non-refundable.</p>'
                }
            ];
            await this.policyRepository.save(defaultPolicies);
        }
    }
    async getHero() {
        return this.heroRepository.find({
            where: { isActive: true },
            order: { sortOrder: 'ASC', createdAt: 'DESC' }
        });
    }
    async getAdminHeroes() {
        return this.heroRepository.find({
            order: { sortOrder: 'ASC', createdAt: 'DESC' }
        });
    }
    async getPromos(service) {
        const where = service ? { service, isActive: true } : { isActive: true };
        return this.promoRepository.find({ where });
    }
    async getDestinations(isInternational) {
        const where = isInternational !== undefined ? { isInternational } : {};
        return this.destinationRepository.find({ where });
    }
    async getBlogs() {
        return this.blogRepository.find({ where: { status: 'published' } });
    }
    async getPolicy(key) {
        return this.policyRepository.findOne({ where: { key } });
    }
    async updateHero(id, data) {
        await this.heroRepository.update(id, data);
        return this.heroRepository.findOne({ where: { id } });
    }
    async createHero(data) {
        return this.heroRepository.save(data);
    }
    async deleteHero(id) {
        return this.heroRepository.delete(id);
    }
    async updatePromo(id, data) {
        await this.promoRepository.update(id, data);
        return this.promoRepository.findOne({ where: { id } });
    }
    async createPromo(data) {
        return this.promoRepository.save(data);
    }
    async deletePromo(id) {
        return this.promoRepository.delete(id);
    }
    async updateDestination(id, data) {
        await this.destinationRepository.update(id, data);
        return this.destinationRepository.findOne({ where: { id } });
    }
    async createDestination(data) {
        return this.destinationRepository.save(data);
    }
    async deleteDestination(id) {
        return this.destinationRepository.delete(id);
    }
    async updateBlog(id, data) {
        await this.blogRepository.update(id, data);
        return this.blogRepository.findOne({ where: { id } });
    }
    async createBlog(data) {
        return this.blogRepository.save(data);
    }
    async deleteBlog(id) {
        return this.blogRepository.delete(id);
    }
    async updatePolicy(key, title, contentHtml) {
        let policy = await this.policyRepository.findOne({ where: { key } });
        if (!policy) {
            policy = this.policyRepository.create({ key, title, contentHtml });
        }
        else {
            policy.title = title;
            policy.contentHtml = contentHtml;
        }
        return this.policyRepository.save(policy);
    }
};
exports.CmsService = CmsService;
exports.CmsService = CmsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cms_entity_1.CmsHero)),
    __param(1, (0, typeorm_1.InjectRepository)(cms_entity_1.CmsPromo)),
    __param(2, (0, typeorm_1.InjectRepository)(cms_entity_1.CmsDestination)),
    __param(3, (0, typeorm_1.InjectRepository)(cms_entity_1.CmsBlog)),
    __param(4, (0, typeorm_1.InjectRepository)(cms_entity_1.CmsPolicy)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CmsService);
//# sourceMappingURL=cms.service.js.map