import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rate } from './entities/rate.entity';

@Injectable()
export class RatesService {
       constructor(
              @InjectRepository(Rate)
              private ratesRepository: Repository<Rate>,
       ) { }

       findAll(hotelId: string) {
              return this.ratesRepository.find({ where: { hotelId }, order: { createdAt: 'DESC' } });
       }

       async findOne(id: string) {
              const rate = await this.ratesRepository.findOne({ where: { id } });
              if (!rate) throw new NotFoundException('Rate not found');
              return rate;
       }

       create(hotelId: string, dto: Partial<Rate>) {
              const rate = this.ratesRepository.create({ ...dto, hotelId });
              return this.ratesRepository.save(rate);
       }

       async update(id: string, dto: Partial<Rate>) {
              await this.ratesRepository.update(id, dto);
              return this.findOne(id);
       }

       async remove(id: string) {
              await this.ratesRepository.delete(id);
              return { message: 'Rate deleted' };
       }

       // Tour Partner Methods
       findAllForTourPartner(tourPartnerId: string) {
              return this.ratesRepository.find({ 
                     where: { tourPartnerId }, 
                     order: { createdAt: 'DESC' } 
              });
       }

       async findOneForTourPartner(id: string, tourPartnerId: string) {
              const rate = await this.ratesRepository.findOne({ where: { id, tourPartnerId } });
              if (!rate) throw new NotFoundException('Rate not found');
              return rate;
       }

       async createForTourPartner(tourPartnerId: string, dto: Partial<Rate>) {
              const rate = this.ratesRepository.create({ ...dto, tourPartnerId });
              return this.ratesRepository.save(rate);
       }
}
