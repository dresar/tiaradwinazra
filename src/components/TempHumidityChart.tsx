import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
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
    time: new Date(d.waktu).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    suhu: d.suhu,
    kelembaban: d.kelembaban,
  }));

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Suhu & Kelembaban Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="suhu" stroke="hsl(0 84% 60%)" strokeWidth={2} dot={false} name="Suhu (°C)" />
              <Line type="monotone" dataKey="kelembaban" stroke="hsl(210 80% 56%)" strokeWidth={2} dot={false} name="Kelembaban (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
