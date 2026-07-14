import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CmsService } from './cms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller()
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  // ==========================================
  // PUBLIC ENDPOINTS
  // ==========================================

  @Get('public/cms/hero')
  getHero() {
    return this.cmsService.getHero();
  }

  @Get('public/cms/promos')
  getPromos(@Query('service') service?: string) {
    return this.cmsService.getPromos(service);
  }

  @Get('public/cms/destinations')
  getDestinations(@Query('isInternational') isInternational?: string) {
    const isInt = isInternational === 'true' ? true : isInternational === 'false' ? false : undefined;
    return this.cmsService.getDestinations(isInt);
  }

  @Get('public/cms/blogs')
  getBlogs() {
    return this.cmsService.getBlogs();
  }

  @Get('public/cms/policy/:key')
  getPolicy(@Param('key') key: string) {
    return this.cmsService.getPolicy(key);
  }

  // ==========================================
  // ADMIN CONTROL ENDPOINTS
  // ==========================================

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Get('admin/cms/hero')
  getAdminHeroes() {
    return this.cmsService.getAdminHeroes();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Post('admin/cms/hero')
  createHero(@Body() data: any) {
    return this.cmsService.createHero(data);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Patch('admin/cms/hero/:id')
  updateHero(@Param('id') id: string, @Body() data: any) {
    return this.cmsService.updateHero(id, data);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Delete('admin/cms/hero/:id')
  deleteHero(@Param('id') id: string) {
    return this.cmsService.deleteHero(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Post('admin/cms/promos')
  createPromo(@Body() data: any) {
    return this.cmsService.createPromo(data);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Patch('admin/cms/promos/:id')
  updatePromo(@Param('id') id: string, @Body() data: any) {
    return this.cmsService.updatePromo(id, data);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Delete('admin/cms/promos/:id')
  deletePromo(@Param('id') id: string) {
    return this.cmsService.deletePromo(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Post('admin/cms/destinations')
  createDestination(@Body() data: any) {
    return this.cmsService.createDestination(data);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Patch('admin/cms/destinations/:id')
  updateDestination(@Param('id') id: string, @Body() data: any) {
    return this.cmsService.updateDestination(id, data);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Delete('admin/cms/destinations/:id')
  deleteDestination(@Param('id') id: string) {
    return this.cmsService.deleteDestination(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Post('admin/cms/blogs')
  createBlog(@Body() data: any) {
    return this.cmsService.createBlog(data);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Patch('admin/cms/blogs/:id')
  updateBlog(@Param('id') id: string, @Body() data: any) {
    return this.cmsService.updateBlog(id, data);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Delete('admin/cms/blogs/:id')
  deleteBlog(@Param('id') id: string) {
    return this.cmsService.deleteBlog(id);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('ADMIN', 'superadmin', 'OWNER')
  @Put('admin/cms/policy/:key')
  updatePolicy(
    @Param('key') key: string,
    @Body('title') title: string,
    @Body('contentHtml') contentHtml: string,
  ) {
    return this.cmsService.updatePolicy(key, title, contentHtml);
  }
}
