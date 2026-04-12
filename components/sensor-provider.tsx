"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { SensorData, SensorResponse } from "@/types/sensor";

interface SensorCtx {
  data: SensorResponse;
  lastUpdate: Date | null;
  isOnline: boolean;
}

const SensorContext = createContext<SensorCtx>({
  data: { latest: null, history: [] },
  lastUpdate: null,
  isOnline: false,
});

export const useSensor = () => useContext(SensorContext);

export function SensorProvider({
  children,
  intervalMs = 5000,
}: {
  children: ReactNode;
  intervalMs?: number;
}) {
  const [data, setData] = useState<SensorResponse>({ latest: null, history: [] });
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/get_data");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: SensorResponse = await res.json();
      setData(json);
      setLastUpdate(new Date());
      setIsOnline(true);
    } catch {
      setIsOnline(false);
    }
  }, []);

  // Initial fetch + polling every intervalMs
  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, intervalMs);
    return () => clearInterval(id);
  }, [fetchData, intervalMs]);

  // Offline detection: no data received in last 15 seconds
  useEffect(() => {
    const checker = setInterval(() => {
      if (lastUpdate && Date.now() - lastUpdate.getTime() > 15000) {
        setIsOnline(false);
      }
    }, 5000);
    return () => clearInterval(checker);
  }, [lastUpdate]);

  return (
    <SensorContext.Provider value={{ data, lastUpdate, isOnline }}>
      {children}
    </SensorContext.Provider>
  );
}
