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
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={loginWithGoogle}
        className="px-6 py-3 bg-black text-white rounded-lg"
      >
        Sign in with Google
      </button>
    </div>
  );
}
