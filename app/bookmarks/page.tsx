"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function BookmarksPage() {
  const [user, setUser] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setChecking(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white">
        <p className="text-gray-600">Checking login...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-linear-to-b from-gray-50 to-white">
        <div className="bg-white p-10 rounded-3xl shadow border text-center max-w-md w-full">
          <p className="text-2xl font-extrabold mb-2">You are not logged in</p>
          <p className="text-gray-600 mb-6">
            Please login with Google to access your bookmarks.
          </p>

          <a
            href="/login"
            className="inline-block bg-purple-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b bg-[#28021e]">
      <Navbar />

      <div className="bg-[#420532] max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6 ">
          <h1 className=" text-white/90 text-3xl md:text-4xl font-extrabold text-center">
            My Bookmarks 🔖
          </h1>
          <p className="text-white/70 mt-2 text-center">
            Your personal library, synced in real-time.
          </p>
        </div>

        {/* Form */}
        <BookmarkForm user={user} />

        {/* List */}
        <BookmarkList user={user} />
      </div>
    </div>
  );
}
