"use client";

import { useSensor } from "@/components/sensor-provider";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getStatusColor, getStatusDotColor } from "@/lib/statusColor";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Database } from "lucide-react";

const PAGE_SIZE = 10;

export default function HistoryPage() {
  const { data } = useSensor();
  const [page, setPage] = useState(0);

  const sorted = [...data.history].reverse();
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const pageData = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold">Riwayat Data Monitoring</h1>
        <p className="text-sm text-muted-foreground">
          50 data terbaru dari sensor ESP32
        </p>
      </div>

      {data.history.length === 0 ? (
        <Card className="shadow-sm">
          <CardContent className="p-12 text-center">
            <Database className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
            <h3 className="font-semibold text-muted-foreground">
              Belum Ada Data
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Data akan muncul saat ESP32 mulai mengirim sensor readings
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="shadow-sm">
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Waktu</TableHead>
                    <TableHead className="text-right">ADC</TableHead>
                    <TableHead className="text-right">Kadar Air (%)</TableHead>
                    <TableHead className="text-right">Suhu (°C)</TableHead>
                    <TableHead className="text-right">Kelembaban (%)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="whitespace-nowrap text-sm">
                        {new Date(row.waktu).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {row.nilai_adc}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {row.kadar_air}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {row.suhu}
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">
                        {row.kelembaban}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${getStatusColor(row.status_mutu)}`}
                        >
                          <span
                            className={`inline-block h-1.5 w-1.5 rounded-full mr-1.5 ${getStatusDotColor(row.status_mutu)}`}
                          />
                          {row.status_mutu}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Halaman {page + 1} dari {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
