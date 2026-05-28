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
exports.SupportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const support_faq_entity_1 = require("./entities/support-faq.entity");
const support_ticket_entity_1 = require("./entities/support-ticket.entity");
let SupportService = class SupportService {
    faqRepository;
    ticketRepository;
    constructor(faqRepository, ticketRepository) {
        this.faqRepository = faqRepository;
        this.ticketRepository = ticketRepository;
    }
    async findAllFaqs() {
        return this.faqRepository.find({ order: { displayOrder: 'ASC' } });
    }
    async createTicket(partnerId, type, dto) {
        const ticketData = { ...dto };
        if (type === 'hotel')
            ticketData.hotelId = partnerId;
        else
            ticketData.tourPartnerId = partnerId;
        const ticket = new support_ticket_entity_1.SupportTicket();
        Object.assign(ticket, ticketData);
        return await this.ticketRepository.save(ticket);
    }
    async findAllByPartner(partnerId, type) {
        const where = type === 'hotel' ? { hotelId: partnerId } : { tourPartnerId: partnerId };
        return this.ticketRepository.find({
            where,
            order: { createdAt: 'DESC' },
        });
    }
    async findAllTickets() {
        return this.ticketRepository.find({
            relations: ['hotel', 'tourPartner'],
            order: { createdAt: 'DESC' },
        });
    }
    async updateTicket(id, dto) {
        await this.ticketRepository.update(id, dto);
        const updated = await this.ticketRepository.findOne({
            where: { id },
            relations: ['hotel', 'tourPartner'],
        });
        if (!updated)
            throw new common_1.NotFoundException('Ticket not found');
        return updated;
    }
    async seedInitialFaqs() {
        const count = await this.faqRepository.count();
        if (count === 0) {
            const initialFaqs = [
                {
                    q: 'How do I update my room availability?',
                    a: 'Go to Inventory Console → Select your room type → Click on any date to update availability or enable Stop Sale.',
                    cat: 'Inventory',
                },
                {
                    q: 'Can I set different rates for the same room on different dates?',
                    a: 'Yes! Use Rate Manager to create seasonal and special event rate rules. These override the base rate for the specified date range.',
                    cat: 'Rates',
                },
                {
                    q: 'How does the inventory hold work?',
                    a: 'When a customer starts the checkout process, the room is held for 15 minutes. If payment is not completed, the hold is released automatically.',
                    cat: 'Bookings',
                },
                {
                    q: 'How do I add a staff member?',
                    a: 'Go to Staff Management → Click "Add Staff Member" → Fill in their details and set permissions. They will receive a welcome email with login instructions.',
                    cat: 'Staff',
                },
                {
                    q: 'When will I receive my payouts?',
                    a: 'Payouts are processed every 7 days. TolidayTrip deducts the agreed commission and transfers the balance to your registered bank account.',
                    cat: 'Payments',
                },
                {
                    q: 'How do I upload hotel images?',
                    a: 'Go to Media Gallery and either drag & drop images or click "Browse Files". Organize them by category (Lobby, Rooms, etc.) for the best guest experience.',
                    cat: 'Media',
                },
            ];
            for (const faq of initialFaqs) {
                await this.faqRepository.save(this.faqRepository.create({
                    question: faq.q,
                    answer: faq.a,
                    category: faq.cat,
                    displayOrder: initialFaqs.indexOf(faq),
                }));
            }
        }
    }
};
exports.SupportService = SupportService;
exports.SupportService = SupportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(support_faq_entity_1.SupportFaq)),
    __param(1, (0, typeorm_1.InjectRepository)(support_ticket_entity_1.SupportTicket)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SupportService);
//# sourceMappingURL=support.service.js.map