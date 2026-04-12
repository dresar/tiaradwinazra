import { useState, useEffect, useCallback } from "react";
import type { SensorData, SensorResponse } from "@/types/sensor";

/*
  SQL Schema for tb_monitoring:

  CREATE TABLE tb_monitoring (
    id SERIAL PRIMARY KEY,
    nilai_adc INTEGER NOT NULL,
    kadar_air REAL NOT NULL,
    suhu REAL NOT NULL,
    kelembaban REAL NOT NULL,
    status_mutu VARCHAR(50) NOT NULL,
    waktu TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
*/

// Simulated data generator for demo purposes
// Replace fetchData() body with actual fetch("/api/sensor") when backend is connected
function generateMockData(): SensorResponse {
  const statuses = ["SANGAT KERING", "KERING", "AMAN", "WASPADA", "BAHAYA"];
  const now = Date.now();
  const history: SensorData[] = Array.from({ length: 50 }, (_, i) => {
    const kadar = 8 + Math.random() * 12;
    let status: string;
    if (kadar <= 10) status = "SANGAT KERING";
    else if (kadar <= 12) status = "KERING";
    else if (kadar <= 14) status = "AMAN";
    else if (kadar <= 16) status = "WASPADA";
    else status = "BAHAYA";

    return {
      id: i + 1,
      nilai_adc: Math.floor(500 + Math.random() * 3500),
      kadar_air: parseFloat(kadar.toFixed(1)),
      suhu: parseFloat((24 + Math.random() * 8).toFixed(1)),
      kelembaban: parseFloat((50 + Math.random() * 30).toFixed(1)),
      status_mutu: status,
      waktu: new Date(now - (49 - i) * 5000).toISOString(),
    };
  });
  return { latest: history[history.length - 1], history };
}

export function useSensorData(intervalMs = 5000) {
  const [data, setData] = useState<SensorResponse>({ latest: null, history: [] });
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      // TODO: Replace with actual API call:
      // const res = await fetch("/api/sensor");
      // const json = await res.json();
      const json = generateMockData();
      setData(json);
      setLastUpdate(new Date());
      setIsOnline(true);
    } catch {
      setIsOnline(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, intervalMs);
    return () => clearInterval(id);
  }, [fetchData, intervalMs]);

  // Check if offline (no data in last 15s)
  useEffect(() => {
    const checker = setInterval(() => {
      if (lastUpdate && Date.now() - lastUpdate.getTime() > 15000) {
        setIsOnline(false);
      }
    }, 5000);
    return () => clearInterval(checker);
  }, [lastUpdate]);

  return { data, lastUpdate, isOnline };
}
