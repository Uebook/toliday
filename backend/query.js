const { Client } = require('pg');
require('dotenv').config({ path: '.env' });

async function run() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();

  const query = `
    SELECT 
      h.name as hotel_name, 
      h.city, 
      COUNT(DISTINCT rt.id) as room_types,
      string_agg(DISTINCT s.email, ', ') as emails
    FROM hotels h
    LEFT JOIN room_types rt ON rt."hotelId" = h.id
    LEFT JOIN staffs s ON s."hotelId" = h.id
    GROUP BY h.id
    ORDER BY room_types DESC
    LIMIT 10;
  `;

  try {
    const res = await client.query(query);
    console.log("DEMO HOTELS:");
    console.table(res.rows);
  } catch (err) {
    console.error(err);
  }

  await client.end();
}

run();
