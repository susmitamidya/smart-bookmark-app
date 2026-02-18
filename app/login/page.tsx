"use client";

import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/bookmarks`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#28021e]">
      <div className="bg-white/90 p-10 rounded-2xl shadow border w-full max-w-md">
        <h1 className="text-3xl font-extrabold mb-2 text-center">
          Smart Bookmark 🔖
        </h1>

        <p className="text-gray-600 mb-8 text-center">
          Login with Google to save bookmarks privately.
        </p>

        <button
          onClick={loginWithGoogle}
          className="w-full px-6 py-3 bg-linear-to-r from-[#28021e] to-purple-700/80 border hover:bg-purple-900 text-white rounded-xl font-semibold"
        >
          Continue with Google
        </button>

        <p className="text-xs text-gray-500 mt-6 text-center">
          No email/password. Google login only.
        </p>
      </div>
    </div>
  );
}


