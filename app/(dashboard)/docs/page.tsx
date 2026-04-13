"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Cpu,
  AlertTriangle,
  Database,
  Globe,
  Code2,
  Wifi,
  Copy,
  Check,
  Server,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 px-2 text-xs"
      onClick={handleCopy}
    >
      {copied ? (
        <Check className="h-3 w-3 mr-1 text-emerald-500" />
      ) : (
        <Copy className="h-3 w-3 mr-1" />
      )}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

export default function DocumentationPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.replace("/");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") return null;

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://your-app.vercel.app";

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <div>
        <h1 className="text-xl font-bold">Dokumentasi Sistem</h1>
        <p className="text-sm text-muted-foreground">
          ERD, API Endpoints, Kode ESP32, dan Arsitektur Sistem
        </p>
      </div>

      {/* ============================================= */}
      {/* ERD - Entity Relationship Diagram */}
      {/* ============================================= */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <Database className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">
            Entity Relationship Diagram (ERD)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Visual ERD using CSS */}
              <div className="flex items-start justify-center gap-16 py-6">
                {/* tb_monitoring */}
                <div className="border-2 border-blue-300 rounded-lg overflow-hidden shadow-md min-w-[280px]">
                  <div className="bg-blue-600 text-white px-4 py-2 font-bold text-sm text-center">
                    tb_monitoring
                  </div>
                  <div className="bg-white divide-y text-sm">
                    <div className="px-4 py-1.5 flex justify-between">
                      <span>
                        <span className="text-amber-500 font-bold mr-1">🔑</span>
                        id
                      </span>
                      <span className="text-muted-foreground font-mono text-xs">SERIAL PK</span>
                    </div>
                    <div className="px-4 py-1.5 flex justify-between">
                      <span>nilai_adc</span>
                      <span className="text-muted-foreground font-mono text-xs">INTEGER</span>
                    </div>
                    <div className="px-4 py-1.5 flex justify-between">
                      <span>kadar_air</span>
                      <span className="text-muted-foreground font-mono text-xs">REAL</span>
                    </div>
                    <div className="px-4 py-1.5 flex justify-between">
                      <span>suhu</span>
                      <span className="text-muted-foreground font-mono text-xs">REAL</span>
                    </div>
                    <div className="px-4 py-1.5 flex justify-between">
                      <span>kelembaban</span>
                      <span className="text-muted-foreground font-mono text-xs">REAL</span>
                    </div>
                    <div className="px-4 py-1.5 flex justify-between">
                      <span>status_mutu</span>
                      <span className="text-muted-foreground font-mono text-xs">VARCHAR(50)</span>
                    </div>
                    <div className="px-4 py-1.5 flex justify-between">
                      <span>waktu</span>
                      <span className="text-muted-foreground font-mono text-xs">TIMESTAMP</span>
                    </div>
                  </div>
                </div>

                {/* tb_users */}
                <div className="border-2 border-emerald-300 rounded-lg overflow-hidden shadow-md min-w-[280px]">
                  <div className="bg-emerald-600 text-white px-4 py-2 font-bold text-sm text-center">
                    tb_users
                  </div>
                  <div className="bg-white divide-y text-sm">
                    <div className="px-4 py-1.5 flex justify-between">
                      <span>
                        <span className="text-amber-500 font-bold mr-1">🔑</span>
                        id
                      </span>
                      <span className="text-muted-foreground font-mono text-xs">SERIAL PK</span>
                    </div>
                    <div className="px-4 py-1.5 flex justify-between">
                      <span>username</span>
                      <span className="text-muted-foreground font-mono text-xs">VARCHAR(50) UQ</span>
                    </div>
                    <div className="px-4 py-1.5 flex justify-between">
                      <span>password</span>
                      <span className="text-muted-foreground font-mono text-xs">VARCHAR(255)</span>
                    </div>
                    <div className="px-4 py-1.5 flex justify-between">
                      <span>nama_lengkap</span>
                      <span className="text-muted-foreground font-mono text-xs">VARCHAR(100)</span>
                    </div>
                    <div className="px-4 py-1.5 flex justify-between">
                      <span>role</span>
                      <span className="text-muted-foreground font-mono text-xs">VARCHAR(20)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ERD Notes */}
              <div className="text-xs text-muted-foreground text-center mt-2 space-y-1">
                <p>PK = Primary Key | UQ = Unique | SERIAL = Auto Increment</p>
                <p>role CHECK constraint: {`'admin'`} atau {`'petani'`}</p>
                <p>Database: PostgreSQL (Neon Serverless)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ============================================= */}
      {/* API ENDPOINTS */}
      {/* ============================================= */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <Globe className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">
            API Endpoints untuk ESP32
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* POST /api/simpan_data */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-600 hover:bg-green-600 text-white text-xs font-mono">
                POST
              </Badge>
              <code className="text-sm font-mono font-medium">
                /api/simpan_data
              </code>
              <CopyButton text={`${baseUrl}/api/simpan_data`} />
            </div>
            <p className="text-sm text-muted-foreground">
              Endpoint utama untuk menerima data sensor dari ESP32. Kirim data setiap 3-5 detik.
            </p>

            <div className="bg-muted/50 border rounded-lg p-4 space-y-3">
              <p className="text-xs font-medium text-foreground">Full URL:</p>
              <div className="flex items-center gap-2">
                <code className="text-xs bg-background border rounded px-3 py-1.5 flex-1 font-mono">
                  {baseUrl}/api/simpan_data
                </code>
                <CopyButton text={`${baseUrl}/api/simpan_data`} />
              </div>

              <Separator />

              <p className="text-xs font-medium text-foreground">Request Headers:</p>
              <pre className="text-xs bg-background border rounded p-3 overflow-x-auto font-mono">
{`Content-Type: application/json`}
              </pre>

              <p className="text-xs font-medium text-foreground">Request Body (JSON):</p>
              <pre className="text-xs bg-background border rounded p-3 overflow-x-auto font-mono">
{`{
  "adc": 2150,
  "kadar_air": 11.6,
  "suhu": 28.5,
  "kelembaban": 65.0,
  "status": "AMAN"
}`}
              </pre>

              <p className="text-xs font-medium text-foreground">Response Success (201):</p>
              <pre className="text-xs bg-background border rounded p-3 overflow-x-auto font-mono">
{`{
  "success": true,
  "message": "Data berhasil disimpan",
  "data": { "id": 1, "waktu": "2026-04-13T..." }
}`}
              </pre>

              <p className="text-xs font-medium text-foreground">Response Error (500):</p>
              <pre className="text-xs bg-background border rounded p-3 overflow-x-auto font-mono">
{`{ "error": "error message" }`}
              </pre>
            </div>
          </div>

          <Separator />

          {/* GET /api/get_data */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-600 hover:bg-blue-600 text-white text-xs font-mono">
                GET
              </Badge>
              <code className="text-sm font-mono font-medium">
                /api/get_data
              </code>
            </div>
            <p className="text-sm text-muted-foreground">
              Mengambil 50 data terbaru dari database. Dashboard memanggil endpoint ini setiap 5 detik (polling).
            </p>
            <div className="bg-muted/50 border rounded-lg p-4">
              <p className="text-xs font-medium text-foreground mb-2">Response (200):</p>
              <pre className="text-xs bg-background border rounded p-3 overflow-x-auto font-mono">
{`{
  "latest": {
    "id": 99, "nilai_adc": 2150,
    "kadar_air": 11.6, "suhu": 28.5,
    "kelembaban": 65.0, "status_mutu": "AMAN",
    "waktu": "2026-04-13T02:00:00.000Z"
  },
  "history": [ ... ] // 50 records, chronological
}`}
              </pre>
            </div>
          </div>

          <Separator />

          {/* POST /api/auth/login */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-600 hover:bg-amber-600 text-white text-xs font-mono">
                POST
              </Badge>
              <code className="text-sm font-mono font-medium">
                /api/auth/login
              </code>
            </div>
            <p className="text-sm text-muted-foreground">
              Autentikasi pengguna. Membandingkan password menggunakan bcrypt hash.
            </p>
            <div className="bg-muted/50 border rounded-lg p-4 space-y-3">
              <p className="text-xs font-medium text-foreground">Request Body:</p>
              <pre className="text-xs bg-background border rounded p-3 overflow-x-auto font-mono">
{`{ "username": "admin", "password": "admin123" }`}
              </pre>
              <p className="text-xs font-medium text-foreground">Response (200):</p>
              <pre className="text-xs bg-background border rounded p-3 overflow-x-auto font-mono">
{`{
  "success": true,
  "user": {
    "id": 1, "username": "admin",
    "nama_lengkap": "Administrator Sistem",
    "role": "admin"
  }
}`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ============================================= */}
      {/* STATUS MUTU JAGUNG */}
      {/* ============================================= */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">
            Klasifikasi Kadar Air Jagung
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Sistem sortir jagung otomatis berdasarkan kadar air yang terukur oleh sensor kapasitif.
            Servo motor akan mengarahkan jagung ke jalur yang sesuai:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg px-4 py-3 bg-gray-100 text-gray-700 border">
              <div className="flex items-center justify-between">
                <span className="font-bold">⚪ KOSONG</span>
                <span className="text-xs font-mono">{`< 5%`}</span>
              </div>
              <p className="text-xs mt-1">
                Wadah kosong / sensor idle. Servo tetap di posisi tengah. Sistem siap menerima jagung baru.
              </p>
            </div>
            <div className="rounded-lg px-4 py-3 bg-amber-50 text-amber-800 border border-amber-200">
              <div className="flex items-center justify-between">
                <span className="font-bold">🟡 KERING</span>
                <span className="text-xs font-mono">5% – 10%</span>
              </div>
              <p className="text-xs mt-1">
                Jagung terlalu kering. Servo berputar ke <strong>KIRI (0°)</strong> untuk memisahkan.
              </p>
            </div>
            <div className="rounded-lg px-4 py-3 bg-emerald-50 text-emerald-800 border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="font-bold">🟢 AMAN</span>
                <span className="text-xs font-mono">10% – 14%</span>
              </div>
              <p className="text-xs mt-1">
                Kualitas optimal untuk penyimpanan. Servo tetap di <strong>TENGAH (90°)</strong>.
              </p>
            </div>
            <div className="rounded-lg px-4 py-3 bg-red-50 text-red-800 border border-red-200">
              <div className="flex items-center justify-between">
                <span className="font-bold">🔴 BASAH</span>
                <span className="text-xs font-mono">{`> 14%`}</span>
              </div>
              <p className="text-xs mt-1">
                Jagung terlalu basah (rentan jamur). Servo berputar ke <strong>KANAN (180°)</strong>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ============================================= */}
      {/* ARSITEKTUR HARDWARE ESP32 */}
      {/* ============================================= */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <Cpu className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">
            Arsitektur Hardware ESP32
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          {/* System Architecture Diagram */}
          <div className="bg-muted/30 border rounded-lg p-6">
            <p className="text-xs font-medium text-foreground mb-4 text-center">
              Arsitektur Sistem IoT
            </p>
            <div className="flex flex-col items-center gap-3 text-xs">
              {/* Sensors Row */}
              <div className="flex gap-4 flex-wrap justify-center">
                <div className="border rounded-lg px-3 py-2 bg-blue-50 text-blue-700 text-center min-w-[130px]">
                  <div className="font-bold">Sensor Kapasitif</div>
                  <div className="text-[10px]">ADC Pin 32</div>
                </div>
                <div className="border rounded-lg px-3 py-2 bg-red-50 text-red-700 text-center min-w-[130px]">
                  <div className="font-bold">DHT22</div>
                  <div className="text-[10px]">Pin 27 (Suhu + RH)</div>
                </div>
                <div className="border rounded-lg px-3 py-2 bg-amber-50 text-amber-700 text-center min-w-[130px]">
                  <div className="font-bold">Servo SG90</div>
                  <div className="text-[10px]">Pin 26 (Sortir)</div>
                </div>
              </div>

              <div className="text-lg text-muted-foreground">↓</div>

              {/* ESP32 */}
              <div className="border-2 border-primary rounded-lg px-6 py-3 bg-primary/5 text-center">
                <div className="font-bold text-primary text-sm">ESP32</div>
                <div className="text-[10px] text-muted-foreground">
                  ADC 12-bit | WiFi | Regresi Linear
                </div>
              </div>

              <div className="text-lg text-muted-foreground">↓ HTTP POST (WiFi)</div>

              {/* Server */}
              <div className="border-2 border-emerald-400 rounded-lg px-6 py-3 bg-emerald-50 text-center">
                <div className="font-bold text-emerald-700 text-sm">
                  Vercel Serverless
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Next.js API Route → POST /api/simpan_data
                </div>
              </div>

              <div className="text-lg text-muted-foreground">↓</div>

              {/* Database */}
              <div className="border-2 border-violet-400 rounded-lg px-6 py-3 bg-violet-50 text-center">
                <div className="font-bold text-violet-700 text-sm">
                  Neon PostgreSQL
                </div>
                <div className="text-[10px] text-muted-foreground">
                  tb_monitoring + tb_users
                </div>
              </div>

              <div className="text-lg text-muted-foreground">↓ Polling 5 detik</div>

              {/* Dashboard */}
              <div className="border-2 border-blue-400 rounded-lg px-6 py-3 bg-blue-50 text-center">
                <div className="font-bold text-blue-700 text-sm">
                  Dashboard Web
                </div>
                <div className="text-[10px] text-muted-foreground">
                  GET /api/get_data → React Charts
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <p className="font-medium text-foreground">Spesifikasi Komponen:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>ESP32 DevKit V1:</strong> Microcontroller utama dengan WiFi
              built-in, ADC 12-bit (0–4095).
            </li>
            <li>
              <strong>Sensor Kapasitif:</strong> Mengukur kadar air jagung via analog
              output (Pin 32). Kalibrasi regresi linear:{" "}
              <code className="bg-muted px-1 rounded text-xs">
                kadar = (-0.0157 × ADC) + 45.4
              </code>
            </li>
            <li>
              <strong>DHT22:</strong> Sensor suhu (-40°C ~ 80°C) dan kelembaban relatif
              (0–100%) pada Pin 27.
            </li>
            <li>
              <strong>Servo SG90:</strong> Motor sortir pada Pin 26. Tiga posisi: Kiri (0°), Tengah (90°), Kanan (180°).
            </li>
            <li>
              <strong>LCD I2C 16×2:</strong> Display lokal untuk pembacaan real-time (alamat 0x27).
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* ============================================= */}
      {/* KODE ESP32 ULTIMATE INTEGRATION */}
      {/* ============================================= */}
      <Card className="shadow-lg border-2 border-primary/30 overflow-hidden">
        <div className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="h-6 w-6" />
            <div>
              <h2 className="text-lg font-bold">Ultimate Firmware ESP32</h2>
              <p className="text-xs opacity-90">Integrated WiFi + HTTP + Hardware Logic (Sortir Jagung)</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-none animate-pulse">
            Ready to deploy
          </Badge>
        </div>

        <CardContent className="p-0">
          <div className="bg-slate-900 p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">tiara_iot_v1.ino</div>
            <div className="w-10" />
          </div>

          <div className="relative group">
            <div className="absolute right-6 top-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton
                text={`#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include "DHT.h"
#include <ESP32Servo.h>

/**
 * ========================================================
 * KOMPONEN & PINOUT:
 * 1. ESP32 DevKit V1
 * 2. LCD I2C (Alamat 0x27) -> SDA: 21, SCL: 22
 * 3. Sensor Kapasitif -> Output Analog: Pin 32
 * 4. DHT22 -> Data: Pin 27
 * 5. Servo SG90 -> PWM: Pin 26
 * ========================================================
 */

// ================= WIFI & API CONFIG =================
const char* ssid     = "NAMA_WIFI_ANDA";     // Ganti dengan SSID WiFi
const char* password = "PASSWORD_WIFI";      // Ganti dengan Password WiFi
const char* serverUrl = "${baseUrl}/api/simpan_data"; 

// ================= PIN & HARDWARE CONFIG =================
#define DHTPIN 27
#define DHTTYPE DHT22
const int soilPin = 32;  // Sensor Kapasitif ADC
const int servoPin = 26; // Motor Servo SG90

// ================= INITIALIZE OBJECTS =================
DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);
Servo myServo;

// ================= PREDIKSI KADAR AIR (REGRESI LINEAR) =================
// Rumus: y = ax + b (y = Kadar Air, x = ADC)
float a = -0.0157;
float b = 45.4;

// ================= POSISI SERVO =================
const int posisi_tengah = 90;
const int posisi_kanan  = 180; // Jalur BASAH
const int posisi_kiri   = 0;   // Jalur KERING

// ================= STATE & TIMING =================
enum SystemState { IDLE, SORTING, LOCKOUT };
SystemState currentState = IDLE;
unsigned long servoStartTime = 0;
const unsigned long servoDelay = 10000; // Tahan servo 10 detik setelah sortir
unsigned long lastMeasure = 0;
const unsigned long measureInterval = 3000; // Baca sensor tiap 3 detik

// -------------------------------------------------------------------------
// FUNGSI: BACA ADC STABIL
// -------------------------------------------------------------------------
int readADCstable(int pin) {
  long sum = 0;
  for (int i = 0; i < 15; i++) {
    sum += analogRead(pin);
    delay(5);
  }
  return sum / 15;
}

// -------------------------------------------------------------------------
// FUNGSI: LOGIKA STATUS JAGUNG
// -------------------------------------------------------------------------
String tentukanStatus(float kadar) {
  if (kadar < 5.0) return "KOSONG";
  if (kadar >= 5.0 && kadar < 10.0) return "KERING";
  if (kadar >= 10.0 && kadar <= 14.0) return "AMAN";
  return "BASAH";
}

// -------------------------------------------------------------------------
// FUNGSI: KONEKSI WIFI
// -------------------------------------------------------------------------
void connectWiFi() {
  Serial.print("\\nConnecting to WiFi...");
  lcd.clear();
  lcd.setCursor(0, 0); lcd.print("Connecting...");
  
  WiFi.begin(ssid, password);
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500); Serial.print("."); attempts++;
    lcd.setCursor(0, 1); lcd.print("Attempts: " + String(attempts));
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\\nWiFi Connected!");
    lcd.clear();
    lcd.setCursor(0, 0); lcd.print("WiFi: OK!");
    lcd.setCursor(0, 1); lcd.print(WiFi.localIP());
    delay(2000);
  } else {
    Serial.println("\\nWiFi Failed! Starting Offline Mode.");
    lcd.clear();
    lcd.setCursor(0, 0); lcd.print("WiFi ERROR");
    lcd.setCursor(0, 1); lcd.print("Offline Mode");
    delay(3000);
  }
}

// -------------------------------------------------------------------------
// FUNGSI: KIRIM DATA KE VERCEL
// -------------------------------------------------------------------------
void kirimDataWeb(int adc, float kadar, float suhu, float hum, String currentStatus) {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  // Create JSON Data
  String payload = "{\\"adc\\":" + String(adc) 
                 + ",\\"kadar_air\\":" + String(kadar, 1) 
                 + ",\\"suhu\\":" + String(suhu, 1)
                 + ",\\"kelembaban\\":" + String(hum, 1) 
                 + ",\\"status\\":\\"" + currentStatus + "\\"}";

  Serial.print("--- SENDING DATA ---");
  Serial.println(payload);

  int httpCode = http.POST(payload);
  if (httpCode > 0) {
    if (httpCode == 201) Serial.println(">>> Web Data SAVED ✅");
    else Serial.println(">>> HTTP Response: " + String(httpCode));
  } else {
    Serial.println(">>> Connection Error: " + http.errorToString(httpCode));
  }
  http.end();
}

// -------------------------------------------------------------------------
// SETUP
// -------------------------------------------------------------------------
void setup() {
  Serial.begin(115200);
  Serial.println("\\n=== INITIALIZING SYSTEM ===");

  // Display Init
  lcd.init(); lcd.backlight();
  lcd.setCursor(0, 0); lcd.print("SYSTEM INIT...");
  
  // Sensor Init
  dht.begin();
  analogReadResolution(12);

  // Connection
  connectWiFi();

  // Servo Initial Position
  myServo.setPeriodHertz(50);
  myServo.attach(servoPin);
  myServo.write(posisi_tengah);
  delay(1000);
  myServo.detach(); // Detach to prevent jitter

  lcd.clear();
  lcd.setCursor(0, 0); lcd.print("SYSTEM READY");
  delay(2000);
}

// -------------------------------------------------------------------------
// LOOP UTAMA
// -------------------------------------------------------------------------
void loop() {
  
  // 1. PEMBACAAN DATA (TIAP 3 DETIK)
  if (millis() - lastMeasure >= measureInterval) {
    lastMeasure = millis();

    int analogVal = readADCstable(soilPin);
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    
    // Hitung Kadar Air
    float kadarAir = constrain((a * analogVal) + b, 0, 100);
    String status = tentukanStatus(kadarAir);

    // Kirim ke Cloud Vercel
    kirimDataWeb(analogVal, kadarAir, t, h, status);

    // Monitoring Serial
    Serial.println("===============================");
    Serial.print("ADC: "); Serial.println(analogVal);
    Serial.print("Kadar: "); Serial.print(kadarAir, 1); Serial.println("%");
    Serial.print("Status: "); Serial.println(status);
    Serial.println("===============================");

    // Monitoring LCD
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("K:" + String(kadarAir, 1) + "% " + status);
    
    lcd.setCursor(0, 1);
    lcd.print("T:" + String(t, 1) + "C H:" + String(h, 0) + "%");

    // 2. LOGIKA SORTIR OTOMATIS
    
    // Aktifkan kembali sistem jika wadah sudah kosong
    if (status == "KOSONG" && currentState == LOCKOUT) {
      currentState = IDLE;
      Serial.println("[INFO] Wadah Kosong. Menunggu Jagung Baru...");
    }

    // Eksekusi Sortir (Hanya jika Status bukan KOSONG dan sedang IDLE)
    if (status != "KOSONG" && currentState == IDLE) {
      Serial.println("[ACTION] Jagung Terdeteksi! Memulai Sortir...");
      
      myServo.attach(servoPin);
      
      if (status == "BASAH") {
        Serial.println("[SERVO] Move to KANAN (180)");
        myServo.write(posisi_kanan);
      } 
      else if (status == "KERING") {
        Serial.println("[SERVO] Move to KIRI (0)");
        myServo.write(posisi_kiri);
      }
      else {
        Serial.println("[SERVO] Keep TENGAH (90)");
        myServo.write(posisi_tengah);
      }
      
      currentState = SORTING;
      servoStartTime = millis();
    }
  }

  // 3. AUTO CLOSE / LOCKOUT
  // Setelah melewati waktu sortir, kembalikan servo ke posisi netral
  if (currentState == SORTING && (millis() - servoStartTime >= servoDelay)) {
    Serial.println("[ACTION] Sortir Selesai. Menutup Pintu (Tengah).");
    myServo.write(posisi_tengah);
    delay(800);
    myServo.detach();
    currentState = LOCKOUT;
  }
}`}
              />
            </div>

            <pre className="text-[11px] bg-slate-950 text-slate-300 p-8 overflow-x-auto font-mono leading-relaxed max-h-[700px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
{`#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include "DHT.h"
#include <ESP32Servo.h>

/**
 * ========================================================
 * KOMPONEN & PINOUT:
 * 1. ESP32 DevKit V1
 * 2. LCD I2C (Alamat 0x27) -> SDA: 21, SCL: 22
 * 3. Sensor Kapasitif -> Output Analog: Pin 32
 * 4. DHT22 -> Data: Pin 27
 * 5. Servo SG90 -> PWM: Pin 26
 * ========================================================
 */

// ================= WIFI & API CONFIG =================
const char* ssid     = "NAMA_WIFI_ANDA";     // Ganti dengan SSID WiFi
const char* password = "PASSWORD_WIFI";      // Ganti dengan Password WiFi
const char* serverUrl = "${baseUrl}/api/simpan_data"; 

// ================= PIN & HARDWARE CONFIG =================
#define DHTPIN 27
#define DHTTYPE DHT22
const int soilPin = 32;  // Sensor Kapasitif ADC
const int servoPin = 26; // Motor Servo SG90

// ================= INITIALIZE OBJECTS =================
DHT dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(0x27, 16, 2);
Servo myServo;

// ================= PREDIKSI KADAR AIR (REGRESI LINEAR) =================
// Rumus: y = ax + b (y = Kadar Air, x = ADC)
float a = -0.0157;
float b = 45.4;

// ================= POSISI SERVO =================
const int posisi_tengah = 90;
const int posisi_kanan  = 180; // Jalur BASAH
const int posisi_kiri   = 0;   // Jalur KERING

// ================= STATE & TIMING =================
enum SystemState { IDLE, SORTING, LOCKOUT };
SystemState currentState = IDLE;
unsigned long servoStartTime = 0;
const unsigned long servoDelay = 10000; // Tahan servo 10 detik setelah sortir
unsigned long lastMeasure = 0;
const unsigned long measureInterval = 3000; // Baca sensor tiap 3 detik

// -------------------------------------------------------------------------
// FUNGSI: BACA ADC STABIL
// -------------------------------------------------------------------------
int readADCstable(int pin) {
  long sum = 0;
  for (int i = 0; i < 15; i++) {
    sum += analogRead(pin);
    delay(5);
  }
  return sum / 15;
}

// -------------------------------------------------------------------------
// FUNGSI: LOGIKA STATUS JAGUNG
// -------------------------------------------------------------------------
String tentukanStatus(float kadar) {
  if (kadar < 5.0) return "KOSONG";
  if (kadar >= 5.0 && kadar < 10.0) return "KERING";
  if (kadar >= 10.0 && kadar <= 14.0) return "AMAN";
  return "BASAH";
}

// -------------------------------------------------------------------------
// FUNGSI: KONEKSI WIFI
// -------------------------------------------------------------------------
void connectWiFi() {
  Serial.print("\\nConnecting to WiFi...");
  lcd.clear();
  lcd.setCursor(0, 0); lcd.print("Connecting...");
  
  WiFi.begin(ssid, password);
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500); Serial.print("."); attempts++;
    lcd.setCursor(0, 1); lcd.print("Attempts: " + String(attempts));
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\\nWiFi Connected!");
    lcd.clear();
    lcd.setCursor(0, 0); lcd.print("WiFi: OK!");
    lcd.setCursor(0, 1); lcd.print(WiFi.localIP());
    delay(2000);
  } else {
    Serial.println("\\nWiFi Failed! Starting Offline Mode.");
    lcd.clear();
    lcd.setCursor(0, 0); lcd.print("WiFi ERROR");
    lcd.setCursor(0, 1); lcd.print("Offline Mode");
    delay(3000);
  }
}

// -------------------------------------------------------------------------
// FUNGSI: KIRIM DATA KE VERCEL
// -------------------------------------------------------------------------
void kirimDataWeb(int adc, float kadar, float suhu, float hum, String currentStatus) {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  // Create JSON Data
  String payload = "{\\"adc\\":" + String(adc) 
                 + ",\\"kadar_air\\":" + String(kadar, 1) 
                 + ",\\"suhu\\":" + String(suhu, 1)
                 + ",\\"kelembaban\\":" + String(hum, 1) 
                 + ",\\"status\\":\\"" + currentStatus + "\\"}";

  Serial.print("--- SENDING DATA ---");
  Serial.println(payload);

  int httpCode = http.POST(payload);
  if (httpCode > 0) {
    if (httpCode == 201) Serial.println(">>> Web Data SAVED ✅");
    else Serial.println(">>> HTTP Response: " + String(httpCode));
  } else {
    Serial.println(">>> Connection Error: " + http.errorToString(httpCode));
  }
  http.end();
}

// -------------------------------------------------------------------------
// SETUP
// -------------------------------------------------------------------------
void setup() {
  Serial.begin(115200);
  Serial.println("\\n=== INITIALIZING SYSTEM ===");

  // Display Init
  lcd.init(); lcd.backlight();
  lcd.setCursor(0, 0); lcd.print("SYSTEM INIT...");
  
  // Sensor Init
  dht.begin();
  analogReadResolution(12);

  // Connection
  connectWiFi();

  // Servo Initial Position
  myServo.setPeriodHertz(50);
  myServo.attach(servoPin);
  myServo.write(posisi_tengah);
  delay(1000);
  myServo.detach(); // Detach to prevent jitter

  lcd.clear();
  lcd.setCursor(0, 0); lcd.print("SYSTEM READY");
  delay(2000);
}

// -------------------------------------------------------------------------
// LOOP UTAMA
// -------------------------------------------------------------------------
void loop() {
  
  // 1. PEMBACAAN DATA (TIAP 3 DETIK)
  if (millis() - lastMeasure >= measureInterval) {
    lastMeasure = millis();

    int analogVal = readADCstable(soilPin);
    float t = dht.readTemperature();
    float h = dht.readHumidity();
    
    // Hitung Kadar Air
    float kadarAir = constrain((a * analogVal) + b, 0, 100);
    String status = tentukanStatus(kadarAir);

    // Kirim ke Cloud Vercel
    kirimDataWeb(analogVal, kadarAir, t, h, status);

    // Monitoring Serial
    Serial.println("===============================");
    Serial.print("ADC: "); Serial.println(analogVal);
    Serial.print("Kadar: "); Serial.print(kadarAir, 1); Serial.println("%");
    Serial.print("Status: "); Serial.println(status);
    Serial.println("===============================");

    // Monitoring LCD
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("K:" + String(kadarAir, 1) + "% " + status);
    
    lcd.setCursor(0, 1);
    lcd.print("T:" + String(t, 1) + "C H:" + String(h, 0) + "%");

    // 2. LOGIKA SORTIR OTOMATIS
    
    // Aktifkan kembali sistem jika wadah sudah kosong
    if (status == "KOSONG" && currentState == LOCKOUT) {
      currentState = IDLE;
      Serial.println("[INFO] Wadah Kosong. Menunggu Jagung Baru...");
    }

    // Eksekusi Sortir (Hanya jika Status bukan KOSONG dan sedang IDLE)
    if (status != "KOSONG" && currentState == IDLE) {
      Serial.println("[ACTION] Jagung Terdeteksi! Memulai Sortir...");
      
      myServo.attach(servoPin);
      
      if (status == "BASAH") {
        Serial.println("[SERVO] Move to KANAN (180)");
        myServo.write(posisi_kanan);
      } 
      else if (status == "KERING") {
        Serial.println("[SERVO] Move to KIRI (0)");
        myServo.write(posisi_kiri);
      }
      else {
        Serial.println("[SERVO] Keep TENGAH (90)");
        myServo.write(posisi_tengah);
      }
      
      currentState = SORTING;
      servoStartTime = millis();
    }
  }

  // 3. AUTO CLOSE / LOCKOUT
  // Setelah melewati waktu sortir, kembalikan servo ke posisi netral
  if (currentState == SORTING && (millis() - servoStartTime >= servoDelay)) {
    Serial.println("[ACTION] Sortir Selesai. Menutup Pintu (Tengah).");
    myServo.write(posisi_tengah);
    delay(800);
    myServo.detach();
    currentState = LOCKOUT;
  }
}`}
            </pre>
          </div>

          <div className="bg-slate-50 border-t p-6">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
              <BookOpen className="h-4 w-4 text-primary" />
              Panduan Instalasi Firmware
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</div>
                  <div className="text-[12px] leading-relaxed">
                    <p className="font-bold">Persiapkan Arduino IDE</p>
                    <p className="text-muted-foreground">Pastikan Board ESP32 sudah terinstal di Board Manager.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</div>
                  <div className="text-[12px] leading-relaxed">
                    <p className="font-bold">Instal Library Wajib</p>
                    <ul className="list-disc pl-4 text-muted-foreground">
                      <li>DHT sensor library (Adafruit)</li>
                      <li>ESP32Servo</li>
                      <li>LiquidCrystal I2C</li>
                      <li>Adafruit Unified Sensor</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</div>
                  <div className="text-[12px] leading-relaxed">
                    <p className="font-bold">Konfigurasi WiFi</p>
                    <p className="text-muted-foreground">Isi <code className="bg-muted px-1 rounded">ssid</code> dan <code className="bg-muted px-1 rounded">password</code> sesuai koneksi hotspot/router Anda.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</div>
                  <div className="text-[12px] leading-relaxed">
                    <p className="font-bold">Upload & Monitor</p>
                    <p className="text-muted-foreground">Klik Upload dan buka Serial Monitor (Baudrate 115200) untuk memantau status pengiriman data.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ============================================= */}
      {/* SKEMA WIRING (BARU) */}
      {/* ============================================= */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <Cpu className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">Skema Wiring (Pinout Resmi)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <p className="font-bold text-sm border-b pb-1">Power System</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li className="flex justify-between"><span>VCC ESP32</span> <span className="font-mono text-primary">Micro USB / 5V</span></li>
                <li className="flex justify-between"><span>Sensor Soil VCC</span> <span className="font-mono text-primary">3.3V (ADC Safe)</span></li>
                <li className="flex justify-between"><span>Servo SG90 VCC</span> <span className="font-mono text-red-500 font-bold">5V (External Recommended)</span></li>
              </ul>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <p className="font-bold text-sm border-b pb-1">Data/Signal Pins</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li className="flex justify-between"><span>Soil Moisture</span> <span className="font-mono text-primary">Pin 32 (Analog)</span></li>
                <li className="flex justify-between"><span>DHT22 Data</span> <span className="font-mono text-primary">Pin 27 (Digital)</span></li>
                <li className="flex justify-between"><span>Servo PWM</span> <span className="font-mono text-primary">Pin 26 (PWM)</span></li>
                <li className="flex justify-between"><span>LCD SDA / SCL</span> <span className="font-mono text-primary">Pin 21 / 22 (I2C)</span></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* ============================================= */}
      {/* ARSITEKTUR DEPLOYMENT */}
      {/* ============================================= */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <Server className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">
            Deployment (Vercel)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border rounded-lg p-3">
              <p className="font-medium text-foreground text-xs mb-1">Frontend</p>
              <p className="text-xs">Next.js 14 App Router — React Server & Client Components</p>
            </div>
            <div className="border rounded-lg p-3">
              <p className="font-medium text-foreground text-xs mb-1">Backend</p>
              <p className="text-xs">Vercel Serverless Functions — Node.js Runtime (API Routes)</p>
            </div>
            <div className="border rounded-lg p-3">
              <p className="font-medium text-foreground text-xs mb-1">Database</p>
              <p className="text-xs">Neon PostgreSQL — Serverless connection pooling + SSL</p>
            </div>
          </div>

          <div className="bg-muted/50 border rounded-lg p-4">
            <p className="text-xs font-medium text-foreground mb-2">
              Environment Variable (Vercel Dashboard):
            </p>
            <code className="text-xs font-mono block bg-background border rounded px-3 py-2 break-all">
              DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
            </code>
          </div>
        </CardContent>
      </Card>

      {/* ============================================= */}
      {/* RBAC */}
      {/* ============================================= */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <Shield className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">
            Role-Based Access Control
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 font-medium">Fitur</th>
                  <th className="text-center py-2 px-3 font-medium">Admin</th>
                  <th className="text-center py-2 px-3 font-medium">Petani</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 px-3">Dashboard Monitoring</td>
                  <td className="text-center py-2 px-3">✅</td>
                  <td className="text-center py-2 px-3">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Riwayat Data</td>
                  <td className="text-center py-2 px-3">✅</td>
                  <td className="text-center py-2 px-3">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Koneksi & Dokumentasi</td>
                  <td className="text-center py-2 px-3">✅</td>
                  <td className="text-center py-2 px-3">❌</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">API Endpoints</td>
                  <td className="text-center py-2 px-3">✅</td>
                  <td className="text-center py-2 px-3">❌</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ============================================= */}
      {/* TROUBLESHOOTING */}
      {/* ============================================= */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-base">Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          {[
            {
              q: "Dashboard menampilkan 'Offline'",
              a: "Pastikan ESP32 terhubung WiFi dan endpoint /api/simpan_data dapat diakses. Dashboard akan menampilkan 'Online' setelah menerima data dalam 15 detik.",
            },
            {
              q: "ESP32 error HTTP code -1",
              a: "Biasanya masalah SSL. Pastikan URL menggunakan HTTPS untuk Vercel. Untuk testing lokal bisa pakai HTTP.",
            },
            {
              q: "ADC selalu 0 atau 4095",
              a: "Periksa wiring sensor kapasitif. Pastikan VCC = 3.3V (bukan 5V). Kalibrasi ulang jika perlu dengan mengubah konstanta a dan b.",
            },
            {
              q: "Suhu/Kelembaban NaN",
              a: "Pin data DHT22 mungkin longgar. Pastikan pull-up resistor 10kΩ terpasang antara VCC dan pin DATA.",
            },
            {
              q: "Login gagal (500 error)",
              a: "Pastikan tabel tb_users sudah dibuat dan demo users sudah di-seed. Jalankan: node scripts/run-migrations.js",
            },
            {
              q: "Data tidak tersimpan ke database",
              a: "Periksa DATABASE_URL di .env / Vercel Environment Variables. Pastikan tabel tb_monitoring sudah dibuat.",
            },
          ].map((item) => (
            <div key={item.q}>
              <p className="font-medium text-foreground">{item.q}</p>
              <p>{item.a}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
