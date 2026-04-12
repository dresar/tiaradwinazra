import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { AuthUser } from "@/types/auth";

/*
  =============================================================
  SQL Schema for tb_users (Neon PostgreSQL):
  =============================================================

  CREATE TABLE tb_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- bcrypt hashed
    nama_lengkap VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'petani' CHECK (role IN ('admin', 'petani'))
  );

  -- Insert demo users (passwords hashed with bcrypt, cost 10):
  -- "admin123" => $2a$10$...  |  "petani123" => $2a$10$...
  -- Generate hashes with: require('bcryptjs').hashSync('admin123', 10)

  INSERT INTO tb_users (username, password, nama_lengkap, role) VALUES
    ('admin',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrator', 'admin'),
    ('petani', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Pak Tani',      'petani');

  =============================================================
  API Route: POST /api/auth/login (Next.js / Express)
  =============================================================

  import { Pool } from 'pg';
  import bcrypt from 'bcryptjs';

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  export async function POST(req) {
    const { username, password } = await req.json();
    const { rows } = await pool.query(
      'SELECT id, username, password, nama_lengkap, role FROM tb_users WHERE username = $1',
      [username]
    );
    if (!rows.length) return Response.json({ error: 'User not found' }, { status: 401 });
    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return Response.json({ error: 'Invalid password' }, { status: 401 });
    const { password: _, ...userData } = user;
    return Response.json({ user: userData });
  }
*/

// Demo users for client-side simulation
const DEMO_USERS: Record<string, { password: string; user: AuthUser }> = {
  admin: {
    password: "admin123",
    user: { id: 1, username: "admin", nama_lengkap: "Administrator", role: "admin" },
  },
  petani: {
    password: "petani123",
    user: { id: 2, username: "petani", nama_lengkap: "Pak Tani", role: "petani" },
  },
};

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => ({ success: false }),
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

const STORAGE_KEY = "iot_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setIsLoading(false);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    // TODO: Replace with actual API call:
    // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) });
    // const data = await res.json();

    const entry = DEMO_USERS[username];
    if (!entry || entry.password !== password) {
      return { success: false, error: "Username atau password salah" };
    }

    setUser(entry.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry.user));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
