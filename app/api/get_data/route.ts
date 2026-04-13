import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET /api/get_data — Fetch latest 50 monitoring records
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, nilai_adc, kadar_air, suhu, kelembaban, status_mutu, waktu
       FROM tb_monitoring
       ORDER BY id DESC
       LIMIT 50`
    );

    const rows = result.rows;
    console.log(`[get_data] Berhasil mengambil ${rows.length} data.`);


    // Latest is the first row (highest ID), history is chronological order
    const history = [...rows].reverse();
    const latest = rows.length > 0 ? rows[0] : null;

    return NextResponse.json(
      { latest, history },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error: unknown) {
    console.error("[get_data] Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
