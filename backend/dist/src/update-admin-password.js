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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
dotenv.config({ path: path.join(__dirname, '../.env') });
const AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '6gza7WP9mRRXEQzkGuIs',
    database: process.env.DB_NAME || 'postgres',
    ssl: { rejectUnauthorized: false },
});
async function main() {
    console.log('Connecting to database...');
    await AppDataSource.initialize();
    console.log('Connected!');
    const adminEmail = 'admin@toliday.com';
    const newPassword = 'adminpassword123';
    console.log(`Hashing new password...`);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(`Updating password and role to ADMIN in database...`);
    await AppDataSource.query(`UPDATE staffs SET "passwordHash" = $1, "role" = 'ADMIN' WHERE email = $2`, [hashedPassword, adminEmail]);
    console.log(`Success! Password for ${adminEmail} updated to: ${newPassword} and role set to ADMIN`);
    await AppDataSource.destroy();
}
main().catch((err) => {
    console.error('Error running script:', err);
    process.exit(1);
});
//# sourceMappingURL=update-admin-password.js.map