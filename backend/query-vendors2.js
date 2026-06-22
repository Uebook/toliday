const { Client } = require('pg');
const client = new Client({
  host: 'database-1.cna8g6omyo9y.eu-north-1.rds.amazonaws.com',
  port: 5432,
  user: 'postgres',
  password: '6gza7WP9mRRXEQzkGuIs',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  const cabs = await client.query('SELECT email FROM cab_vendors LIMIT 1');
  const buses = await client.query('SELECT email FROM bus_vendors LIMIT 1');
  const tours = await client.query('SELECT email FROM tour_partners LIMIT 1');
  const hotels = await client.query("SELECT email FROM staffs WHERE role='ADMIN' AND \"hotelId\" IS NOT NULL LIMIT 1");
  
  console.log('Cab Vendor:', cabs.rows[0]?.email || 'None');
  console.log('Bus Vendor:', buses.rows[0]?.email || 'None');
  console.log('Tour Vendor:', tours.rows[0]?.email || 'None');
  console.log('Hotel Vendor:', hotels.rows[0]?.email || 'None');
  await client.end();
}
run().catch(console.error);
