import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { S3Service } from '../media/s3.service';
export declare class AuthController {
    private readonly authService;
    private readonly s3Service;
    constructor(authService: AuthService, s3Service: S3Service);
    private logDebug;
    signup(signUpDto: SignUpDto, files: {
        gst?: Express.Multer.File[];
        pan?: Express.Multer.File[];
        license?: Express.Multer.File[];
    }): Promise<{
        message: string;
        token: string;
        staff: {
            id: string;
            email: string;
            name: string;
            role: import("../staff/entities/staff.entity").StaffRole;
        };
        partner: {
            id: any;
            name: any;
            type: string;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
        staff: {
            id: string;
            email: string;
            name: string;
            role: import("../staff/entities/staff.entity").StaffRole;
        };
    }>;
    changePassword(req: any, body: any): Promise<{
        message: string;
    }>;
}
