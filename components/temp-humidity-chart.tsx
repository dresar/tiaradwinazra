"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { SensorData } from "@/types/sensor";

interface Props {
  data: SensorData[];
}

export function TempHumidityChart({ data }: Props) {
  const chartData = data.map((d) => ({
    time: new Date(d.waktu).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    suhu: d.suhu,
    kelembaban: d.kelembaban,
  }));

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Suhu & Kelembaban Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0 84% 60%)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(0 84% 60%)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="humidGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(210 80% 56%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(210 80% 56%)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.5rem",
                  border: "1px solid hsl(220 13% 91%)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="suhu"
                stroke="hsl(0 84% 60%)"
                strokeWidth={2}
                fill="url(#tempGradient)"
                name="Suhu (°C)"
              />
              <Area
                type="monotone"
                dataKey="kelembaban"
                stroke="hsl(210 80% 56%)"
                strokeWidth={2}
                fill="url(#humidGradient)"
                name="Kelembaban (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
