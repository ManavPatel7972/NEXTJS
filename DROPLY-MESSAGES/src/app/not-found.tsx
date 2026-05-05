"use client";

import Link from "next/link";
import { EyeOff } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full bg-white text-black items-center justify-center px-6">
      <div className="max-w-lg text-center">
        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 bg-black text-white flex items-center justify-center">
            <EyeOff size={26} />
          </div>
        </div>

        {/* ERROR CODE */}
        <h1 className="text-7xl font-bold tracking-tight mb-4">404</h1>

        {/* TITLE */}
        <h2 className="text-2xl font-bold uppercase mb-4">Signal Lost</h2>

        {/* DESCRIPTION */}
        <p className="text-black/60 mb-10">
          The page you're looking for has vanished into the anonymous void. It
          may have been deleted, moved, or never existed.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="
              px-8 py-3
              bg-black text-white
              font-bold uppercase text-sm
              hover:bg-neutral-800
              transition
            "
          >
            Return Home
          </Link>

          <Link
            href="/sign-in"
            className="
              px-8 py-3
              border border-black
              font-bold uppercase text-sm
              hover:bg-black hover:text-white
              transition
            "
          >
            Access Network
          </Link>
        </div>

        {/* FOOTER */}
        <p className="mt-12 text-xs uppercase text-black/40">
          Incognito Messaging Platform
        </p>
      </div>
    </main>
  );
}
