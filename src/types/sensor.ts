export interface SensorData {
  id: number;
  nilai_adc: number;
  kadar_air: number;
  suhu: number;
  kelembaban: number;
  status_mutu: string;
  waktu: string;
}

export interface SensorResponse {
  latest: SensorData | null;
  history: SensorData[];
}
