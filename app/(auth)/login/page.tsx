"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, LogIn, User, Leaf, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dashboard
  if (user) {
    router.replace("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    if (result.success) {
      toast.success("Login berhasil!");
      router.replace("/");
    } else {
      toast.error(result.error || "Login gagal");
    }
  };

  const handleDemoLogin = async (demoUser: string, demoPass: string) => {
    setUsername(demoUser);
    setPassword(demoPass);
    setLoading(true);
    const result = await login(demoUser, demoPass);
    setLoading(false);
    if (result.success) {
      toast.success("Login berhasil!");
      router.replace("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-14 w-14 rounded-xl gradient-banner flex items-center justify-center shadow-lg">
            <LayoutDashboard className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">IoT Monitor</h1>
          <p className="text-sm text-muted-foreground">
            Grain Moisture Monitoring System
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">Masuk ke Akun Anda</CardTitle>
            <CardDescription>Masukkan username dan password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-username">Username</Label>
                <Input
                  id="login-username"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button
                id="login-submit"
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="mr-2 h-4 w-4" />
                )}
                Login
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                Demo Login
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                id="demo-admin"
                variant="outline"
                className="w-full"
                onClick={() => handleDemoLogin("admin", "admin123")}
                disabled={loading}
              >
                <User className="mr-2 h-4 w-4" />
                Login as Admin
              </Button>
              <Button
                id="demo-petani"
                variant="outline"
                className="w-full"
                onClick={() => handleDemoLogin("petani", "petani123")}
                disabled={loading}
              >
                <Leaf className="mr-2 h-4 w-4" />
                Login as Petani
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
