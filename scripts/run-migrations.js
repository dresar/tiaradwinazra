const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  const client = await pool.connect();
  try {
    console.log("✅ Connected to database\n");

    // Create tb_monitoring
    await client.query(`
      CREATE TABLE IF NOT EXISTS tb_monitoring (
        id SERIAL PRIMARY KEY,
        nilai_adc INTEGER NOT NULL,
        kadar_air REAL NOT NULL,
        suhu REAL NOT NULL,
        kelembaban REAL NOT NULL,
        status_mutu VARCHAR(50) NOT NULL,
        waktu TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ tb_monitoring table ready");

    // Create tb_users
    await client.query(`
      CREATE TABLE IF NOT EXISTS tb_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        nama_lengkap VARCHAR(100) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'petani' CHECK (role IN ('admin', 'petani'))
      )
    `);
    console.log("✅ tb_users table ready");

    // Create indexes
    await client.query(`CREATE INDEX IF NOT EXISTS idx_monitoring_id_desc ON tb_monitoring (id DESC)`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_users_username ON tb_users (username)`);
    console.log("✅ Indexes created");

    // Insert demo users only (no dummy monitoring data)
    await client.query(`
      INSERT INTO tb_users (username, password, nama_lengkap, role) VALUES
        ('admin',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrator Sistem', 'admin'),
        ('petani', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Pak Tani',             'petani')
      ON CONFLICT (username) DO NOTHING
    `);
    console.log("✅ Demo users seeded (admin/admin123, petani/petani123)");

    console.log("\n🎉 Migration complete! No dummy data inserted.");
    console.log("   Monitoring data will come from ESP32 hardware only.");
  } catch (err) {
    console.error("❌ Migration error:", err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

run();
