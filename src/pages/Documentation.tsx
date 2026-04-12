import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Cpu, AlertTriangle } from "lucide-react";

export default function Documentation() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold">Documentation</h1>
        <p className="text-sm text-muted-foreground">Reference standards & system architecture</p>
      </div>

      {/* SNI 8926:2020 */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">SNI 8926:2020 — Grain Moisture Standard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            SNI 8926:2020 is the Indonesian National Standard for grain quality measurement,
            defining moisture content thresholds for rice grain storage and trade.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "SANGAT KERING", range: "≤ 10%", color: "bg-blue-100 text-blue-700" },
              { label: "KERING", range: "10% – 12%", color: "bg-gray-100 text-gray-700" },
              { label: "AMAN", range: "12% – 14%", color: "bg-green-100 text-green-700" },
              { label: "WASPADA", range: "14% – 16%", color: "bg-yellow-100 text-yellow-700" },
              { label: "BAHAYA", range: "> 16%", color: "bg-red-100 text-red-700" },
            ].map((s) => (
              <div key={s.label} className={`rounded-lg px-4 py-2 font-medium ${s.color}`}>
                {s.label}: {s.range}
              </div>
            ))}
          </div>
          <p>
            Maintaining moisture content at ≤ 14% is critical for preventing fungal growth and
            ensuring grain longevity during storage.
          </p>
        </CardContent>
      </Card>

      {/* ESP32 Architecture */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <Cpu className="h-5 w-5 text-primary" />
          <CardTitle className="text-base">ESP32 Hardware Architecture</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            The monitoring system uses an <strong>ESP32</strong> microcontroller with a
            capacitive soil moisture sensor and a <strong>DHT22</strong> temperature/humidity sensor.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>ADC Reading:</strong> 12-bit ADC (0–4095) connected to the moisture sensor analog output.</li>
            <li><strong>Moisture Calculation:</strong> ADC value is mapped to percentage using calibration curve.</li>
            <li><strong>DHT22:</strong> Measures ambient temperature (°C) and relative humidity (%).</li>
            <li><strong>WiFi:</strong> ESP32 connects to WiFi and sends POST requests to <code>/api/sensor</code> every 5 seconds.</li>
            <li><strong>Payload:</strong> <code>{"{ adc, kadar_air, suhu, kelembaban, status }"}</code></li>
          </ul>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-status-waspada" />
          <CardTitle className="text-base">Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <div className="space-y-4">
            {[
              { q: "Dashboard shows 'Offline'", a: "Check ESP32 WiFi connection and ensure the API endpoint is reachable. The dashboard expects data within 15 seconds." },
              { q: "ADC value is always 0 or 4095", a: "Verify sensor wiring. Check that the sensor VCC is 3.3V (not 5V for capacitive sensors). Recalibrate if needed." },
              { q: "Temperature/Humidity reads NaN", a: "DHT22 data pin may be loose. Ensure a 10kΩ pull-up resistor is connected between VCC and DATA pins." },
              { q: "Data not saving to database", a: "Verify the Neon PostgreSQL connection string. Check that the tb_monitoring table exists with the correct schema." },
            ].map((item) => (
              <div key={item.q}>
                <p className="font-medium text-foreground">{item.q}</p>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
