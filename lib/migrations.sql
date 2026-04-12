-- =============================================================
-- Database Migration for IoT Monitoring System
-- Target: Neon PostgreSQL (Production)
-- =============================================================

-- Sensor monitoring data table
CREATE TABLE IF NOT EXISTS tb_monitoring (
  id SERIAL PRIMARY KEY,
  nilai_adc INTEGER NOT NULL,
  kadar_air REAL NOT NULL,
  suhu REAL NOT NULL,
  kelembaban REAL NOT NULL,
  status_mutu VARCHAR(50) NOT NULL,
  waktu TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User authentication table
CREATE TABLE IF NOT EXISTS tb_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,  -- bcrypt hashed
  nama_lengkap VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'petani' CHECK (role IN ('admin', 'petani'))
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_monitoring_id_desc ON tb_monitoring (id DESC);
CREATE INDEX IF NOT EXISTS idx_users_username ON tb_users (username);

-- Demo users
-- Passwords: admin123 / petani123 (bcrypt cost 10)
INSERT INTO tb_users (username, password, nama_lengkap, role) VALUES
  ('admin',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrator Sistem', 'admin'),
  ('petani', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Pak Tani',             'petani')
ON CONFLICT (username) DO NOTHING;
