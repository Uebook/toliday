import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

export default async (req: any, res: any) => {
       const config = {
              host: process.env.DB_HOST,
              port: parseInt(process.env.DB_PORT || '5432'),
              user: process.env.DB_USER,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME,
              ssl: {
                     rejectUnauthorized: true,
                     ca: fs.readFileSync(path.join(process.cwd(), 'backend/certs/global-bundle.pem')).toString(),
              },
       };

       const client = new Client(config);

       try {
              console.log('Connecting to DB with config:', { ...config, password: '****' });
              await client.connect();
              const result = await client.query('SELECT NOW()');
              await client.end();
              return res.status(200).json({ success: true, time: result.rows[0] });
       } catch (error) {
              console.error('DB Connection Error:', error);
              return res.status(500).json({ success: false, error: error.message });
       }
};
