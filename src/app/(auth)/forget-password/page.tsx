"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await authClient.requestPasswordReset({
      email: email,
      redirectTo: "/reset-password", 
    });

    if (error) {
      alert(error.message || "Something went wrong");
    } else {
      alert("Official reset email sent! Check your inbox.");
    }
  };


  return (
    <div className="flex h-screen items-center justify-center bg-black px-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-950 text-white">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>We'll email you a link to reset your password.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-zinc-900 border-zinc-800" />
          <Button onClick={handleResetRequest} disabled={loading} className="bg-white text-black hover:bg-zinc-200">
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}