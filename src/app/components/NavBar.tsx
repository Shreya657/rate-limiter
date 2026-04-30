"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, authClient } from "@/lib/auth-client";
import { LayoutDashboard, Loader2, LogOut, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/dist/client/components/navigation";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setIsLoggingOut(true); // Start loading
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/"); 
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full border-b border-zinc-800 bg-black/50 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <ShieldCheck className="text-white w-6 h-6" />
          <span>ShieldLimit</span>
        </Link>

        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="h-8 w-24 bg-zinc-800 animate-pulse rounded" />
          ) : session ? (
            <>
              <Button variant="ghost" asChild className="text-zinc-400 hover:text-black hidden sm:flex">
                <Link href="/dashboard" className="gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
              </Button>
              <div className="h-8 w-[1px] bg-zinc-800 mx-2 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end hidden md:flex">
                  <span className="text-xs text-white font-medium">{session.user.name}</span>
                  <span className="text-[10px] text-zinc-500">Developer</span>
                </div>
                <Button 
                    size="icon" 
                    variant="outline" 
                    className="border-black rounded-full text-black hover:bg-zinc-900 hover:text-white"
                >
                  <User className="w-4 h-4" />
                </Button>
               <Button 
      size="icon" 
      variant="ghost" 
      disabled={isLoggingOut} 
      onClick={handleSignOut} 
      className="text-red-500 hover:text-red-500 transition-colors bg-red-900/10 hover:bg-red-900/20 rounded-full"
    >
      {isLoggingOut ? (
        <Loader2 className="w-4 h-4 animate-spin" /> 
      ) : (
        
        <LogOut className="w-4 h-4" /> 
      )}
    </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="text-zinc-200 hover:text-black">
                <Link href="/sign-in">Login</Link>
              </Button>
              <Button className="bg-white text-black hover:bg-zinc-600 hover:text-white" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}