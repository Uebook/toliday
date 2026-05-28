"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../src/main");
let cachedApp;
exports.default = async (req, res) => {
    console.log(`[DEBUG] Incoming request: ${req.method} ${req.url}`);
    if (!cachedApp) {
        console.log('[DEBUG] Initializing new NestJS app instance...');
        const app = await (0, main_1.createApp)();
        await app.init();
        cachedApp = app.getHttpAdapter().getInstance();
    }
    return cachedApp(req, res);
};
//# sourceMappingURL=index.js.map