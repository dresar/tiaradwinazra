import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
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
    time: new Date(d.waktu).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    kadar_air: d.kadar_air,
  }));

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Kadar Air (Moisture) Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis dataKey="time" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 25]} />
              <Tooltip />
              <ReferenceLine y={14} stroke="hsl(142 71% 45%)" strokeDasharray="5 5" label="Target 14%" />
              <Line type="monotone" dataKey="kadar_air" stroke="hsl(220 80% 56%)" strokeWidth={2} dot={false} name="Kadar Air (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
