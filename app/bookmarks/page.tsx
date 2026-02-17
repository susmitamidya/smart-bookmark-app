"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function BookmarksPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookmarks</h1>
       
       {/*  LOGOUT BUTTON HERE */}
        <button
             onClick={() => supabase.auth.signOut()}
                    className="text-sm text-gray-600 underline mb-4">LogOut

        </button>

      <BookmarkForm user={user} />
      <BookmarkList user={user} />
    </div>
  );
}
