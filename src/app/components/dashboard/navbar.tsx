"use client";

import Link from "next/link";
// import { UserButton } from "./UserButton"; // Use your existing user logic or a custom component
import { ShieldCheck, Bell, LogOut,Loader2,User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient, signOut } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/dist/client/components/navigation";
import { UserButton } from "./userButton";

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
    <nav className="fixed top-0 w-full border-b border-zinc-800 bg-black/60 backdrop-blur-xl z-[100]">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className=" p-1 rounded">
             <Shield className="h-5 w-5 text-teal-500" />
            </div>
            <span className="hidden sm:block text-zinc-200">ShieldLimit</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1 text-sm text-zinc-500">
            <span>Workspace</span>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-200">Main</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-black">
            <Bell className="h-5 w-5" />
          </Button>

         

                  <UserButton/>
        </div>
      </div>
    </nav>
  );
}