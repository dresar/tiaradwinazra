import { Droplets, Thermometer, CloudRain, ShieldCheck } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { MoistureChart } from "@/components/MoistureChart";
import { TempHumidityChart } from "@/components/TempHumidityChart";
import { useSensor } from "@/components/DashboardLayout";
import { getStatusColor, getStatusDotColor } from "@/lib/statusColor";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { data } = useSensor();
  const latest = data.latest;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="gradient-banner rounded-xl p-6 md:p-8 text-primary-foreground">
        <h1 className="text-xl md:text-2xl font-bold">IoT Monitoring Dashboard</h1>
        <p className="text-sm opacity-90 mt-1">
          Real-time grain moisture & environmental monitoring — SNI 8926:2020
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Kadar Air (Moisture)"
          value={latest?.kadar_air ?? "—"}
          unit="%"
          icon={Droplets}
          subtitle="Target ≤ 14%"
          iconClassName="bg-blue-50 text-status-sangat-kering"
        />
        <MetricCard
          title="Suhu Ruangan"
          value={latest?.suhu ?? "—"}
          unit="°C"
          icon={Thermometer}
          subtitle="Temperature"
          iconClassName="bg-red-50 text-destructive"
        />
        <MetricCard
          title="Kelembaban"
          value={latest?.kelembaban ?? "—"}
          unit="%"
          icon={CloudRain}
          subtitle="Humidity"
          iconClassName="bg-cyan-50 text-cyan-600"
        />
        <div>
          <div className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow p-5 h-full">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status Mutu</p>
                {latest ? (
                  <Badge className={`text-sm font-bold px-3 py-1 ${getStatusColor(latest.status_mutu)}`}>
                    <span className={`inline-block h-2 w-2 rounded-full mr-2 ${getStatusDotColor(latest.status_mutu)}`} />
                    {latest.status_mutu}
                  </Badge>
                ) : (
                  <p className="text-2xl font-bold">—</p>
                )}
                <p className="text-xs text-muted-foreground">Quality grade</p>
              </div>
              <div className="rounded-lg p-2.5 bg-green-50 text-status-aman">
                <ShieldCheck className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MoistureChart data={data.history} />
        <TempHumidityChart data={data.history} />
      </div>
    </div>
  );
}
