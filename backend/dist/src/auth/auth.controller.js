"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signup_dto_1 = require("./dto/signup.dto");
const login_dto_1 = require("./dto/login.dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const s3_service_1 = require("../media/s3.service");
const fs = __importStar(require("fs"));
let AuthController = class AuthController {
    authService;
    s3Service;
    constructor(authService, s3Service) {
        this.authService = authService;
        this.s3Service = s3Service;
    }
    logDebug(message) {
        const logEntry = `[${new Date().toISOString()}] ${message}\n`;
        try {
            fs.appendFileSync('signup_debug.log', logEntry);
        }
        catch (e) { }
    }
    async signup(signUpDto, files) {
        try {
            this.logDebug(`--- SIGNUP START ---`);
            this.logDebug(`Files keys: ${Object.keys(files || {})}`);
            if (files?.gst?.[0]) {
                this.logDebug(`Uploading GST...`);
                signUpDto.gstDoc = await this.s3Service.uploadFile(files.gst[0]);
                this.logDebug(`GST URL: ${signUpDto.gstDoc}`);
            }
            if (files?.pan?.[0]) {
                this.logDebug(`Uploading PAN...`);
                signUpDto.panDoc = await this.s3Service.uploadFile(files.pan[0]);
                this.logDebug(`PAN URL: ${signUpDto.panDoc}`);
            }
            if (files?.license?.[0]) {
                this.logDebug(`Uploading License...`);
                signUpDto.licenseDoc = await this.s3Service.uploadFile(files.license[0]);
                this.logDebug(`License URL: ${signUpDto.licenseDoc}`);
            }
            this.logDebug(`Calling AuthService.signup for ${signUpDto.email}`);
            return await this.authService.signup(signUpDto);
        }
        catch (error) {
            this.logDebug(`Signup Error: ${error.message}\nStack: ${error.stack}`);
            console.error('Signup Error:', error);
            throw error;
        }
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async changePassword(req, body) {
        return this.authService.changePassword(req.user.id, body.currentPassword, body.newPassword);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'gst', maxCount: 1 },
        { name: 'pan', maxCount: 1 },
        { name: 'license', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('change-password'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        s3_service_1.S3Service])
], AuthController);
//# sourceMappingURL=auth.controller.js.map