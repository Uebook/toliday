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
  const cabs = await client.query('SELECT email, "passwordHash" FROM cab_vendors LIMIT 1');
  console.log('Cab Vendor:', cabs.rows[0]);
  await client.end();
}
run().catch(console.error);
