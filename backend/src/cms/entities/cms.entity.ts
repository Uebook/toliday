import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('cms_hero')
export class CmsHero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'Redefining Travel' })
  title: string;

  @Column({ default: 'Experience seamless journeys' })
  subtitle: string;

  @Column({ default: 'https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-underwater-shot-1533-large.mp4' })
  mediaUrl: string;

  @Column({ default: 'Search Stays' })
  ctaText: string;

  @Column({ default: 'hotels' })
  ctaLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('cms_promos')
export class CmsPromo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'home' })
  service: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  discount: string;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  link: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('cms_destinations')
export class CmsDestination {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  imageUrl: string;

  @Column({ default: false })
  isInternational: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('cms_blogs')
export class CmsBlog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  image: string;

  @Column({ default: 'General' })
  category: string;

  @Column({ default: '5 min read' })
  readTime: string;

  @Column({ default: 'published' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('cms_policies')
export class CmsPolicy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  key: string; // e.g. 'privacy' or 'refund'

  @Column()
  title: string;

  @Column({ type: 'text' })
  contentHtml: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
