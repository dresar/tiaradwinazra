"use client";

import { Droplets, Thermometer, CloudRain, ShieldCheck } from "lucide-react";
import { MetricCard } from "@/components/metric-card";
import { MoistureChart } from "@/components/moisture-chart";
import { TempHumidityChart } from "@/components/temp-humidity-chart";
import { useSensor } from "@/components/sensor-provider";
import { getStatusColor, getStatusDotColor } from "@/lib/statusColor";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const { data } = useSensor();
  const latest = data.latest;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="gradient-banner rounded-xl p-6 md:p-8 text-primary-foreground">
        <h1 className="text-xl md:text-2xl font-bold">
          IoT Monitoring Dashboard
        </h1>
        <p className="text-sm opacity-90 mt-1">
          Sistem Monitoring Kadar Air Jagung Berbasis IoT — Sortir Otomatis
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Kadar Air"
          value={latest?.kadar_air != null ? latest.kadar_air.toFixed(1) : "—"}
          unit="%"
          icon={Droplets}
          subtitle="AMAN: 10% – 14%"
          iconClassName="bg-blue-50 text-blue-600"
        />
        <MetricCard
          title="Suhu Ruangan"
          value={latest?.suhu != null ? latest.suhu.toFixed(1) : "—"}
          unit="°C"
          icon={Thermometer}
          subtitle="DHT22 Sensor"
          iconClassName="bg-red-50 text-red-500"
        />
        <MetricCard
          title="Kelembaban"
          value={latest?.kelembaban != null ? latest.kelembaban.toFixed(0) : "—"}
          unit="%"
          icon={CloudRain}
          subtitle="Relative Humidity"
          iconClassName="bg-cyan-50 text-cyan-600"
        />
        <div>
          <div className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow p-5 h-full">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status Mutu</p>
                {latest ? (
                  <Badge
                    className={`text-sm font-bold px-3 py-1 ${getStatusColor(latest.status_mutu)}`}
                  >
                    <span
                      className={`inline-block h-2 w-2 rounded-full mr-2 ${getStatusDotColor(latest.status_mutu)}`}
                    />
                    {latest.status_mutu}
                  </Badge>
                ) : (
                  <p className="text-2xl font-bold text-muted-foreground">
                    Menunggu Data
                  </p>
                )}
                <p className="text-xs text-muted-foreground">Kualitas jagung</p>
              </div>
              <div className="rounded-lg p-2.5 bg-emerald-50 text-emerald-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {data.history.length === 0 && (
        <div className="border rounded-xl p-8 text-center bg-card">
          <Droplets className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
          <h3 className="font-semibold text-muted-foreground">
            Belum Ada Data Monitoring
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Data akan muncul otomatis saat ESP32 mengirim ke{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
              POST /api/simpan_data
            </code>
          </p>
        </div>
      )}

      {/* Charts - Only show when we have data */}
      {data.history.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <MoistureChart data={data.history} />
          <TempHumidityChart data={data.history} />
        </div>
      )}
    </div>
  );
}
