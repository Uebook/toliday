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
  const tables = await client.query("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'");
  console.log(tables.rows.map(r => r.tablename));
  await client.end();
}
run().catch(console.error);
