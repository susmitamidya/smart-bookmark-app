"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkList({ user }: { user: any }) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) setBookmarks(data || []);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchBookmarks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  return (
    <div className="space-y-2">
      {bookmarks.map((b) => (
        <div
          key={b.id}
          className="border p-3 rounded flex justify-between items-center"
        >
          <a
            href={b.url}
            target="_blank"
            className="text-blue-600 underline"
          >
            {b.title}
          </a>

          <button
            onClick={() => deleteBookmark(b.id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
