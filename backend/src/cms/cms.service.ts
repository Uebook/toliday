import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CmsHero, CmsPromo, CmsDestination, CmsBlog, CmsPolicy } from './entities/cms.entity';

@Injectable()
export class CmsService implements OnModuleInit {
  constructor(
    @InjectRepository(CmsHero)
    private readonly heroRepository: Repository<CmsHero>,
    @InjectRepository(CmsPromo)
    private readonly promoRepository: Repository<CmsPromo>,
    @InjectRepository(CmsDestination)
    private readonly destinationRepository: Repository<CmsDestination>,
    @InjectRepository(CmsBlog)
    private readonly blogRepository: Repository<CmsBlog>,
    @InjectRepository(CmsPolicy)
    private readonly policyRepository: Repository<CmsPolicy>,
  ) {}

  async onModuleInit() {
    await this.seedHero();
    await this.seedPromos();
    await this.seedDestinations();
    await this.seedBlogs();
    await this.seedPolicies();
  }

  // Seeding Functions
  private async seedHero() {
    const count = await this.heroRepository.count();
    if (count === 0) {
      await this.heroRepository.save({
        title: 'Redefining how the world experiences travel',
        subtitle: 'At TolidayTrip, we believe that traveling is more than just arriving at a destination.',
        mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-underwater-shot-1533-large.mp4',
        ctaText: 'Search Stays',
        ctaLink: 'hotels',
      });
    }
  }

  private async seedPromos() {
    const count = await this.promoRepository.count();
    if (count === 0) {
      const defaultPromos = [
        // Home
        { service: 'home', title: '21st Birthday Sale', description: 'Hotels, Flights, Activities.', code: 'BASH21', discount: 'Up to 60% off', imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=400', link: 'hotels', isActive: true },
        { service: 'home', title: 'Experience True Hospitality', description: 'Exceptional stays around the country.', code: 'RADISSON', discount: 'Flat 20% off', imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400', link: 'hotels', isActive: true },
        // Flights
        { service: 'flights', title: 'Mega Flight Sale', description: 'On Domestic Flights.', code: 'FLYBIG', discount: 'Flat 15% Off', imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=400', link: 'flights', isActive: true },
        // Bus
        { service: 'bus', title: 'Summer Bus Sale', description: 'On AC Sleeper Buses.', code: 'BUSCOOL', discount: 'Up to ₹500 off', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400', link: 'bus', isActive: true },
        // Cab
        { service: 'cab', title: 'Outstation Roadtrip Special', description: 'Explore cities with top rated drivers.', code: 'CABGO', discount: 'Save ₹300', imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=400', link: 'cab', isActive: true }
      ];
      await this.promoRepository.save(defaultPromos);
    }
  }

  private async seedDestinations() {
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

  private async seedBlogs() {
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

  private async seedPolicies() {
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

  // Public Query Methods
  async getHero() {
    const heroes = await this.heroRepository.find();
    return heroes[0] || null;
  }

  async getPromos(service?: string) {
    const where = service ? { service, isActive: true } : { isActive: true };
    return this.promoRepository.find({ where });
  }

  async getDestinations(isInternational?: boolean) {
    const where = isInternational !== undefined ? { isInternational } : {};
    return this.destinationRepository.find({ where });
  }

  async getBlogs() {
    return this.blogRepository.find({ where: { status: 'published' } });
  }

  async getPolicy(key: string) {
    return this.policyRepository.findOne({ where: { key } });
  }

  // Admin Query Methods
  async updateHero(id: string, data: Partial<CmsHero>) {
    await this.heroRepository.update(id, data);
    return this.heroRepository.findOne({ where: { id } });
  }

  async updatePromo(id: string, data: Partial<CmsPromo>) {
    await this.promoRepository.update(id, data);
    return this.promoRepository.findOne({ where: { id } });
  }

  async createPromo(data: Partial<CmsPromo>) {
    return this.promoRepository.save(data);
  }

  async deletePromo(id: string) {
    return this.promoRepository.delete(id);
  }

  async updateDestination(id: string, data: Partial<CmsDestination>) {
    await this.destinationRepository.update(id, data);
    return this.destinationRepository.findOne({ where: { id } });
  }

  async createDestination(data: Partial<CmsDestination>) {
    return this.destinationRepository.save(data);
  }

  async deleteDestination(id: string) {
    return this.destinationRepository.delete(id);
  }

  async updateBlog(id: string, data: Partial<CmsBlog>) {
    await this.blogRepository.update(id, data);
    return this.blogRepository.findOne({ where: { id } });
  }

  async createBlog(data: Partial<CmsBlog>) {
    return this.blogRepository.save(data);
  }

  async deleteBlog(id: string) {
    return this.blogRepository.delete(id);
  }

  async updatePolicy(key: string, title: string, contentHtml: string) {
    let policy = await this.policyRepository.findOne({ where: { key } });
    if (!policy) {
      policy = this.policyRepository.create({ key, title, contentHtml });
    } else {
      policy.title = title;
      policy.contentHtml = contentHtml;
    }
    return this.policyRepository.save(policy);
  }
}
