"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { EyeClosed, EyeOff } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const hiddenRoutes = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
  ];

  if (hiddenRoutes.includes(pathname)) return null;

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false,
      });

      toast.success("Logged out successfully");

      router.replace("/sign-in");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* WEBSITE TITLE */}
        <h1 className="text-xl font-black tracking-tight flex gap-1 items-center ">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center">
            <EyeOff size={20} />
          </div>
          <p>True Feedback</p>
        </h1>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-neutral-600 hover:text-black transition-colors text-sm font-medium"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="text-neutral-600 hover:text-black transition-colors text-sm font-medium"
          >
            Dashboard
          </Link>

          <Link
            href="/about"
            className="text-neutral-600 hover:text-black transition-colors text-sm font-medium"
          >
            About
          </Link>

          <Link
            href="/privacy"
            className="text-neutral-600 hover:text-black transition-colors text-sm font-medium"
          >
            Privacy
          </Link>
        </nav>

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="
          cursor-pointer
            bg-black text-white
            px-6 py-2 rounded-lg
            text-sm font-bold
            transition-all duration-300
            hover:bg-neutral-800
            hover:shadow-lg
            hover:-translate-y-[2px]
            active:translate-y-0
            active:shadow-sm
           
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
}
