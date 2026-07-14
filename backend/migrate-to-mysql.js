/**
 * Migration Script: AWS RDS PostgreSQL → MySQL (Plesk)
 * Migrates all hotel-related tables for Phase 1
 * 
 * Run: node migrate-to-mysql.js
 */

const { Client } = require('pg');
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// ─── SOURCE: AWS RDS PostgreSQL ───────────────────────────────────────────────
const PG_CONFIG = {
  host: 'database-1.cna8g6omyo9y.eu-north-1.rds.amazonaws.com',
  port: 5432,
  user: 'postgres',
  password: '6gza7WP9mRRXEQzkGuIs',
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false,
    ca: fs.existsSync(path.join(__dirname, 'certs/global-bundle.pem'))
      ? fs.readFileSync(path.join(__dirname, 'certs/global-bundle.pem')).toString()
      : undefined,
  },
};

// ─── TARGET: Plesk MySQL ──────────────────────────────────────────────────────
const MYSQL_CONFIG = {
  host: '161.248.26.53',
  port: 3306,
  user: 'tolidaytrip',
  password: 'WIq1$jv~mhQff40z',
  database: 'admin_tolidaytrip',
  multipleStatements: true,
};

// ─── Tables to migrate (in order — respects FK dependencies) ─────────────────
const TABLES = [
  'hotels',
  'staffs',
  'room_types',
  'rooms',
  'inventories',
  'rate_plans',
  'rates',
  'bookings',
  'hotel_reviews',
  'media',
  'promotions',
  'finance_ledger_entries',
  'finance_invoices',
  'housekeeping_records',
  'notifications',
  'global_settings',
  'cms_hero',
  'cms_promos',
  'cms_destinations',
  'cms_blogs',
  'cms_policies',
  'support_faqs',
  'support_tickets',
  'notification_settings',
  'global_reviews',
];

// ─── Helper: escape values for MySQL ─────────────────────────────────────────
function escapeValue(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? '1' : '0';
  if (typeof val === 'number') return val;
  if (val instanceof Date) return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
  if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "\\'")}'`;
  return `'${String(val).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

async function migrateTable(pgClient, mysqlConn, tableName) {
  console.log(`\n📋 Migrating table: ${tableName}`);

  // Check if table exists in PostgreSQL
  let pgRows;
  try {
    const result = await pgClient.query(`SELECT * FROM "${tableName}"`);
    pgRows = result.rows;
    console.log(`   ✅ Found ${pgRows.length} rows in PostgreSQL`);
  } catch (err) {
    console.log(`   ⚠️  Table "${tableName}" not found in PostgreSQL — skipping`);
    return;
  }

  if (pgRows.length === 0) {
    console.log(`   ℹ️  Table is empty — skipping`);
    return;
  }

  // Check if table exists in MySQL
  const [tables] = await mysqlConn.query(
    `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
    [MYSQL_CONFIG.database, tableName]
  );
  if (tables.length === 0) {
    console.log(`   ⚠️  Table "${tableName}" not found in MySQL — skipping (run backend first to create tables)`);
    return;
  }

  // Clear existing data in MySQL
  await mysqlConn.query(`SET FOREIGN_KEY_CHECKS = 0`);
  await mysqlConn.query(`TRUNCATE TABLE \`${tableName}\``);
  await mysqlConn.query(`SET FOREIGN_KEY_CHECKS = 1`);

  // Get columns from PG rows
  const columns = Object.keys(pgRows[0]);

  // Batch insert
  const BATCH_SIZE = 100;
  let inserted = 0;

  for (let i = 0; i < pgRows.length; i += BATCH_SIZE) {
    const batch = pgRows.slice(i, i + BATCH_SIZE);

    const values = batch.map(row => {
      const vals = columns.map(col => escapeValue(row[col]));
      return `(${vals.join(', ')})`;
    });

    const sql = `INSERT IGNORE INTO \`${tableName}\` (\`${columns.join('`, `')}\`) VALUES ${values.join(',\n')}`;

    try {
      await mysqlConn.query(sql);
      inserted += batch.length;
    } catch (err) {
      console.error(`   ❌ Batch insert error: ${err.message}`);
      // Try row by row
      for (const row of batch) {
        const vals = columns.map(col => escapeValue(row[col]));
        const rowSql = `INSERT IGNORE INTO \`${tableName}\` (\`${columns.join('`, `')}\`) VALUES (${vals.join(', ')})`;
        try {
          await mysqlConn.query(rowSql);
          inserted++;
        } catch (rowErr) {
          console.error(`   ❌ Row insert error (id=${row.id}): ${rowErr.message}`);
        }
      }
    }
  }

  console.log(`   ✅ Inserted ${inserted}/${pgRows.length} rows`);
}

async function main() {
  console.log('🚀 Starting Migration: AWS RDS PostgreSQL → MySQL (Plesk)');
  console.log('='.repeat(60));

  let pgClient, mysqlConn;

  try {
    // Connect to PostgreSQL
    console.log('\n🔌 Connecting to AWS RDS PostgreSQL...');
    pgClient = new Client(PG_CONFIG);
    await pgClient.connect();
    console.log('   ✅ PostgreSQL connected');

    // Connect to MySQL
    console.log('🔌 Connecting to Plesk MySQL...');
    mysqlConn = await mysql.createConnection(MYSQL_CONFIG);
    console.log('   ✅ MySQL connected');

    // Migrate tables
    const results = { success: [], skipped: [], failed: [] };

    for (const table of TABLES) {
      try {
        await migrateTable(pgClient, mysqlConn, table);
        results.success.push(table);
      } catch (err) {
        console.error(`   ❌ Failed to migrate ${table}: ${err.message}`);
        results.failed.push(table);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 MIGRATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Success: ${results.success.length} tables`);
    if (results.success.length) console.log(`   ${results.success.join(', ')}`);
    console.log(`⚠️  Failed: ${results.failed.length} tables`);
    if (results.failed.length) console.log(`   ${results.failed.join(', ')}`);
    console.log('\n🎉 Migration complete!');

  } catch (err) {
    console.error('\n❌ Fatal error:', err.message);
    process.exit(1);
  } finally {
    if (pgClient) await pgClient.end();
    if (mysqlConn) await mysqlConn.end();
  }
}

main();
