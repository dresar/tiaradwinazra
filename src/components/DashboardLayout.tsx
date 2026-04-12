import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNavbar } from "@/components/TopNavbar";
import { Outlet } from "react-router-dom";
import { useSensorData } from "@/hooks/useSensorData";
import { createContext, useContext } from "react";
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

export function DashboardLayout() {
  const sensor = useSensorData(5000);

  return (
    <SensorContext.Provider value={sensor}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <TopNavbar isOnline={sensor.isOnline} lastUpdate={sensor.lastUpdate} />
            <main className="flex-1 p-4 md:p-6 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SensorContext.Provider>
  );
}
