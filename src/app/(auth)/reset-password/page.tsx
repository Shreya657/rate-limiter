"use client";

import { authClient } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const handleReset = async () => {
    if (!token) {
      alert("Invalid or missing reset token.");
      return;
    }

    setLoading(true);
    await authClient.resetPassword({
      newPassword: password,
      token: token,
    }, {
      onSuccess: () => {
        alert("Password updated! Logging you in...");
        router.push("/dashboard");
        setLoading(false);
      },
      onError: (ctx) => {
        alert(ctx.error.message);
        setLoading(false);
      },
    });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black px-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-950 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
          <CardDescription className="text-zinc-400">
            Please enter your new password below to secure your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-zinc-400" htmlFor="password">
              New Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-zinc-700 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <Button 
            onClick={handleReset} 
            disabled={loading || !password.trim()} 
            className="w-full bg-white text-black hover:bg-zinc-200 mt-2"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-zinc-800 pt-4">
          <button 
            onClick={() => router.push("/login")}
            className="text-sm text-blue-500 hover:text-white transition-colors"
          >
            Back to Login
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}