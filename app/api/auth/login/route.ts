import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

// POST /api/auth/login — Authenticate user with bcrypt
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi" },
        { status: 400 }
      );
    }

    // Query user by username
    const result = await pool.query(
      "SELECT id, username, password, nama_lengkap, role FROM tb_users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Username tidak ditemukan" },
        { status: 401 }
      );
    }

    const user = result.rows[0];

    // Compare password hash
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Password salah" },
        { status: 401 }
      );
    }

    // Return user data (exclude password)
    const { password: _, ...userData } = user;

    return NextResponse.json(
      { success: true, user: userData },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("[auth/login] Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
