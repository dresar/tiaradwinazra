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
  ReferenceLine,
} from "recharts";
import type { SensorData } from "@/types/sensor";

interface Props {
  data: SensorData[];
}

export function MoistureChart({ data }: Props) {
  const chartData = data.map((d) => ({
    time: new Date(d.waktu).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    kadar_air: d.kadar_air,
  }));

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Kadar Air Jagung (Moisture)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(220 80% 56%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(220 80% 56%)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 30]} />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.5rem",
                  border: "1px solid hsl(220 13% 91%)",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <ReferenceLine
                y={5}
                stroke="hsl(220 9% 60%)"
                strokeDasharray="3 3"
                label={{ value: "5% (KOSONG)", position: "right", fontSize: 10 }}
              />
              <ReferenceLine
                y={10}
                stroke="hsl(45 93% 47%)"
                strokeDasharray="3 3"
                label={{ value: "10% (KERING)", position: "right", fontSize: 10 }}
              />
              <ReferenceLine
                y={14}
                stroke="hsl(142 71% 45%)"
                strokeDasharray="5 5"
                label={{ value: "14% (AMAN↔BASAH)", position: "right", fontSize: 10 }}
              />
              <Area
                type="monotone"
                dataKey="kadar_air"
                stroke="hsl(220 80% 56%)"
                strokeWidth={2}
                fill="url(#moistureGradient)"
                name="Kadar Air (%)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
