global.crypto = require("crypto");

import { createApp } from '../src/main';
let cachedApp: any;

export default async (req: any, res: any) => {
       console.log(`[DEBUG] Incoming request: ${req.method} ${req.url}`);
       if (!cachedApp) {
              console.log('[DEBUG] Initializing new NestJS app instance...');
              const app = await createApp();
              await app.init();
              cachedApp = app.getHttpAdapter().getInstance();
       }
       return cachedApp(req, res);
};
