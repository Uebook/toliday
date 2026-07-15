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
exports.CmsController = void 0;
const common_1 = require("@nestjs/common");
const cms_service_1 = require("./cms.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let CmsController = class CmsController {
    cmsService;
    constructor(cmsService) {
        this.cmsService = cmsService;
    }
    getHero() {
        return this.cmsService.getHero();
    }
    getPromos(service) {
        return this.cmsService.getPromos(service);
    }
    getDestinations(isInternational) {
        const isInt = isInternational === 'true' ? true : isInternational === 'false' ? false : undefined;
        return this.cmsService.getDestinations(isInt);
    }
    getBlogs() {
        return this.cmsService.getBlogs();
    }
    getPolicy(key) {
        return this.cmsService.getPolicy(key);
    }
    getAdminHeroes() {
        return this.cmsService.getAdminHeroes();
    }
    createHero(data) {
        return this.cmsService.createHero(data);
    }
    updateHero(id, data) {
        return this.cmsService.updateHero(id, data);
    }
    deleteHero(id) {
        return this.cmsService.deleteHero(id);
    }
    createPromo(data) {
        return this.cmsService.createPromo(data);
    }
    updatePromo(id, data) {
        return this.cmsService.updatePromo(id, data);
    }
    deletePromo(id) {
        return this.cmsService.deletePromo(id);
    }
    createDestination(data) {
        return this.cmsService.createDestination(data);
    }
    updateDestination(id, data) {
        return this.cmsService.updateDestination(id, data);
    }
    deleteDestination(id) {
        return this.cmsService.deleteDestination(id);
    }
    createBlog(data) {
        return this.cmsService.createBlog(data);
    }
    updateBlog(id, data) {
        return this.cmsService.updateBlog(id, data);
    }
    deleteBlog(id) {
        return this.cmsService.deleteBlog(id);
    }
    updatePolicy(key, title, contentHtml) {
        return this.cmsService.updatePolicy(key, title, contentHtml);
    }
};
exports.CmsController = CmsController;
__decorate([
    (0, common_1.Get)('public/cms/hero'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getHero", null);
__decorate([
    (0, common_1.Get)('public/cms/promos'),
    __param(0, (0, common_1.Query)('service')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getPromos", null);
__decorate([
    (0, common_1.Get)('public/cms/destinations'),
    __param(0, (0, common_1.Query)('isInternational')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getDestinations", null);
__decorate([
    (0, common_1.Get)('public/cms/blogs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getBlogs", null);
__decorate([
    (0, common_1.Get)('public/cms/policy/:key'),
    __param(0, (0, common_1.Param)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getPolicy", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Get)('admin/cms/hero'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "getAdminHeroes", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Post)('admin/cms/hero'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "createHero", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Patch)('admin/cms/hero/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "updateHero", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Delete)('admin/cms/hero/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "deleteHero", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Post)('admin/cms/promos'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "createPromo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Patch)('admin/cms/promos/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "updatePromo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Delete)('admin/cms/promos/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "deletePromo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Post)('admin/cms/destinations'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "createDestination", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Patch)('admin/cms/destinations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "updateDestination", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Delete)('admin/cms/destinations/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "deleteDestination", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Post)('admin/cms/blogs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "createBlog", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Patch)('admin/cms/blogs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "updateBlog", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Delete)('admin/cms/blogs/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "deleteBlog", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'superadmin', 'OWNER'),
    (0, common_1.Put)('admin/cms/policy/:key'),
    __param(0, (0, common_1.Param)('key')),
    __param(1, (0, common_1.Body)('title')),
    __param(2, (0, common_1.Body)('contentHtml')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], CmsController.prototype, "updatePolicy", null);
exports.CmsController = CmsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cms_service_1.CmsService])
], CmsController);
//# sourceMappingURL=cms.controller.js.map