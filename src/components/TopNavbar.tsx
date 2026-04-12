import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wifi, WifiOff, Clock, User, LogOut, Shield, Leaf } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface TopNavbarProps {
  isOnline: boolean;
  lastUpdate: Date | null;
}

export function TopNavbar({ isOnline, lastUpdate }: TopNavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user
    ? user.nama_lengkap
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-14 flex items-center justify-between border-b bg-card px-4 shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Badge
          variant={isOnline ? "default" : "destructive"}
          className="gap-1.5 text-xs"
        >
          {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
          {isOnline ? "Online" : "Offline"}
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        {lastUpdate && (
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {lastUpdate.toLocaleTimeString()}
          </span>
        )}

        {user && (
          <span className="hidden md:flex items-center gap-1.5 text-sm">
            <span className="font-medium">{user.nama_lengkap}</span>
            <Badge variant="secondary" className="text-[10px] capitalize">
              {user.role === "admin" ? <Shield className="h-3 w-3 mr-1" /> : <Leaf className="h-3 w-3 mr-1" />}
              {user.role}
            </Badge>
          </span>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            {user && (
              <>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.nama_lengkap}</p>
                    <p className="text-xs text-muted-foreground capitalize">Role: {user.role}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" /> Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
