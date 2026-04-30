"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa6";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    }, {
      onRequest: () => setLoading(true),
      onResponse: () => setLoading(false),
      onError: (ctx) => alert(ctx.error.message),
    });
  };

  const handleSocialSignIn = async (provider: "github" | "google") => {
  await authClient.signIn.social({
    provider,
    callbackURL: "/dashboard",
  
  });
};

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black px-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-950 text-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription className="text-zinc-400">
            Log in to your account to continue building.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-zinc-900 border-zinc-800" />
          </div>
      
          <div className="grid gap-2">
  <div className="flex items-center justify-between">
    <Label htmlFor="password">Password</Label>
    <Link 
      href="/forgot-password" 
      className="text-xs text-zinc-400 hover:text-white underline-offset-4 hover:underline transition-colors"
    >
      Forgot password?
    </Link>
  </div>
  <Input 
    id="password" 
    type="password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    className="bg-zinc-900 border-zinc-800 focus:ring-1 focus:ring-white" 
  />
</div>
          <Button onClick={handleSignIn} disabled={loading} className="w-full bg-white text-black hover:bg-zinc-200">
            {loading ? "Logging in..." : "Sign In"}
          </Button>
<div className="grid grid-cols-2 gap-4">
  <Button variant="outline" onClick={() => handleSocialSignIn("github")} className="border-zinc-800 bg-zinc-900 hover:bg-zinc-900 gap-2">
    <FaGithub className="w-4 h-4" />
    GitHub
  </Button>
  <Button variant="outline" onClick={() => handleSocialSignIn("google")} className="border-zinc-800 hover:bg-zinc-900 gap-2 bg-zinc-900">
   <FaGoogle className="w-4 h-4" />
    Google
  </Button>
</div>
          <p className="text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-white underline underline-offset-4">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}