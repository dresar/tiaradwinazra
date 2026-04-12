export function getStatusColor(status: string): string {
  switch (status) {
    case "KOSONG":  return "text-gray-500 bg-gray-100";
    case "KERING":  return "text-amber-700 bg-amber-50";
    case "AMAN":    return "text-emerald-700 bg-emerald-50";
    case "BASAH":   return "text-red-700 bg-red-50";
    default:        return "text-muted-foreground bg-muted";
  }
}

export function getStatusDotColor(status: string): string {
  switch (status) {
    case "KOSONG":  return "bg-gray-400";
    case "KERING":  return "bg-amber-500";
    case "AMAN":    return "bg-emerald-500";
    case "BASAH":   return "bg-red-500";
    default:        return "bg-muted-foreground";
  }
}

export function getStatusIcon(status: string): string {
  switch (status) {
    case "KOSONG":  return "⚪";
    case "KERING":  return "🟡";
    case "AMAN":    return "🟢";
    case "BASAH":   return "🔴";
    default:        return "⚫";
  }
}
