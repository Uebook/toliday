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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsPolicy = exports.CmsBlog = exports.CmsDestination = exports.CmsPromo = exports.CmsHero = void 0;
const typeorm_1 = require("typeorm");
let CmsHero = class CmsHero {
    id;
    title;
    subtitle;
    mediaUrl;
    ctaText;
    ctaLink;
    textColor;
    isActive;
    sortOrder;
    createdAt;
    updatedAt;
};
exports.CmsHero = CmsHero;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CmsHero.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Redefining Travel' }),
    __metadata("design:type", String)
], CmsHero.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Experience seamless journeys' }),
    __metadata("design:type", String)
], CmsHero.prototype, "subtitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'https://assets.mixkit.co/videos/preview/mixkit-swimming-pool-underwater-shot-1533-large.mp4' }),
    __metadata("design:type", String)
], CmsHero.prototype, "mediaUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Search Stays' }),
    __metadata("design:type", String)
], CmsHero.prototype, "ctaText", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'hotels' }),
    __metadata("design:type", String)
], CmsHero.prototype, "ctaLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '#ffffff' }),
    __metadata("design:type", String)
], CmsHero.prototype, "textColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], CmsHero.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CmsHero.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CmsHero.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CmsHero.prototype, "updatedAt", void 0);
exports.CmsHero = CmsHero = __decorate([
    (0, typeorm_1.Entity)('cms_hero')
], CmsHero);
let CmsPromo = class CmsPromo {
    id;
    service;
    title;
    description;
    code;
    discount;
    imageUrl;
    link;
    isActive;
    createdAt;
    updatedAt;
};
exports.CmsPromo = CmsPromo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CmsPromo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'home' }),
    __metadata("design:type", String)
], CmsPromo.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CmsPromo.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CmsPromo.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CmsPromo.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CmsPromo.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CmsPromo.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CmsPromo.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], CmsPromo.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CmsPromo.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CmsPromo.prototype, "updatedAt", void 0);
exports.CmsPromo = CmsPromo = __decorate([
    (0, typeorm_1.Entity)('cms_promos')
], CmsPromo);
let CmsDestination = class CmsDestination {
    id;
    name;
    description;
    imageUrl;
    isInternational;
    createdAt;
    updatedAt;
};
exports.CmsDestination = CmsDestination;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CmsDestination.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CmsDestination.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CmsDestination.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CmsDestination.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CmsDestination.prototype, "isInternational", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CmsDestination.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CmsDestination.prototype, "updatedAt", void 0);
exports.CmsDestination = CmsDestination = __decorate([
    (0, typeorm_1.Entity)('cms_destinations')
], CmsDestination);
let CmsBlog = class CmsBlog {
    id;
    title;
    content;
    image;
    category;
    readTime;
    status;
    createdAt;
    updatedAt;
};
exports.CmsBlog = CmsBlog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CmsBlog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CmsBlog.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CmsBlog.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CmsBlog.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'General' }),
    __metadata("design:type", String)
], CmsBlog.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '5 min read' }),
    __metadata("design:type", String)
], CmsBlog.prototype, "readTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'published' }),
    __metadata("design:type", String)
], CmsBlog.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CmsBlog.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CmsBlog.prototype, "updatedAt", void 0);
exports.CmsBlog = CmsBlog = __decorate([
    (0, typeorm_1.Entity)('cms_blogs')
], CmsBlog);
let CmsPolicy = class CmsPolicy {
    id;
    key;
    title;
    contentHtml;
    createdAt;
    updatedAt;
};
exports.CmsPolicy = CmsPolicy;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CmsPolicy.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], CmsPolicy.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CmsPolicy.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CmsPolicy.prototype, "contentHtml", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CmsPolicy.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CmsPolicy.prototype, "updatedAt", void 0);
exports.CmsPolicy = CmsPolicy = __decorate([
    (0, typeorm_1.Entity)('cms_policies')
], CmsPolicy);
//# sourceMappingURL=cms.entity.js.map