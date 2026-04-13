import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";

// CORS headers for ESP32 cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle preflight OPTIONS requests from ESP32
export async function OPTIONS() {
  return NextResponse.json(null, { status: 204, headers: corsHeaders });
}

// POST /api/simpan_data — Receive sensor data from ESP32
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { adc, kadar_air, suhu, kelembaban, status } = body;
    console.log("[simpan_data] Incoming payload:", body);

    // Validate required fields
    if (
      adc === undefined ||
      kadar_air === undefined ||
      suhu === undefined ||
      kelembaban === undefined ||
      !status
    ) {
      console.warn("[simpan_data] Validation failed: Missing fields");
      return NextResponse.json(
        { error: "Missing required fields: adc, kadar_air, suhu, kelembaban, status" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Insert into tb_monitoring
    const result = await pool.query(
      `INSERT INTO tb_monitoring (nilai_adc, kadar_air, suhu, kelembaban, status_mutu)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, waktu`,
      [Number(adc), Number(kadar_air), Number(suhu), Number(kelembaban), String(status)]
    );

    const inserted = result.rows[0];
    console.log(`[simpan_data] Data berhasil disimpan. ID: ${inserted.id}`);

    return NextResponse.json(

      {
        success: true,
        message: "Data berhasil disimpan",
        data: { id: inserted.id, waktu: inserted.waktu },
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error("[simpan_data] Error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: message },
      { status: 500, headers: corsHeaders }
    );
  }
}
