import * as mysql from 'mysql2/promise';

export default async (req: any, res: any) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log('Connecting to MySQL DB:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
    });
    const [rows] = await connection.query('SELECT NOW() as time');
    await connection.end();
    return res.status(200).json({ success: true, time: rows[0] });
  } catch (error) {
    console.error('DB Connection Error:', error);
    await connection.end().catch(() => {});
    return res.status(500).json({ success: false, error: error.message });
  }
};

