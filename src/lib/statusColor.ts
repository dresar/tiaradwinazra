export function getStatusColor(status: string): string {
  switch (status) {
    case "SANGAT KERING": return "text-status-sangat-kering bg-blue-50";
    case "KERING": return "text-status-kering bg-gray-100";
    case "AMAN": return "text-status-aman bg-green-50";
    case "WASPADA": return "text-status-waspada bg-yellow-50";
    case "BAHAYA": return "text-status-bahaya bg-red-50";
    default: return "text-muted-foreground bg-muted";
  }
}

export function getStatusDotColor(status: string): string {
  switch (status) {
    case "SANGAT KERING": return "bg-status-sangat-kering";
    case "KERING": return "bg-status-kering";
    case "AMAN": return "bg-status-aman";
    case "WASPADA": return "bg-status-waspada";
    case "BAHAYA": return "bg-status-bahaya";
    default: return "bg-muted-foreground";
  }
}
