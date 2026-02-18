"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? "");
    });
  }, []);

  return (
    <div className="w-full bg-[#28021e]  sticky top-0 z-40">
      <div className="max-w-2xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/bookmarks" className="font-bold text-lg">
          🔖 Smart Bookmark
        </Link>

        <div className="flex items-center gap-3">
          {email && (
            <p className="hidden md:block text-sm text-white">{email}</p>
          )}

          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm bg-gray-900 hover:bg-black text-white border border-white/70 px-4 py-2 rounded-xl font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
