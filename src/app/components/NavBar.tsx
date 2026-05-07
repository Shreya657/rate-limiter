"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut, authClient } from "@/lib/auth-client";
import { FileText, LayoutDashboard, Loader2, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/dist/client/components/navigation";
import { UserButton } from "./dashboard/userButton";

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
        <Shield className="h-5 w-5 text-teal-500" />
          <span>ShieldLimit</span>
        </Link>

        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="h-8 w-24 bg-zinc-800 animate-pulse rounded" />
          ) : session ? (
            <>
              <Button variant="ghost" asChild className="text-zinc-400 hover:text-black hidden sm:flex">
                 
                <Link href="/dashboard/project" className="gap-2">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
              </Button>
             <Button variant="ghost" asChild className="text-teal-500 hover:text-black hidden sm:flex">
  <Link href="/docs" className="gap-2">
    <FileText className="w-4 h-4" /> Docs 
  </Link>
</Button>
              <div className="h-8 w-[1px] bg-zinc-800 mx-2 hidden sm:block" />
              <div className="flex items-center gap-3">
                <div className="flex flex-row items-end hidden gap-2 md:flex">
                  <span className="text-xs text-white font-medium pb-2 ">{session.user.name}</span>
                  <UserButton/>
                </div>
              
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
                        <Button variant="ghost" asChild className="text-teal-500 hover:text-black hidden sm:flex">
  <Link href="/docs" className="gap-2">
    <FileText className="w-4 h-4" /> Docs 
  </Link>
</Button>
              
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}