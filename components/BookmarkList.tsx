"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Toast from "./Toast";
import SearchSortBar, { SortType } from "./SearchSortBar";

export default function BookmarkList({ user }: { user: any }) {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType>("newest");

  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" }>(
    { msg: "", type: "success" }
  );

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 2500);
  };

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id);

    if (!error) setBookmarks(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  //  realtime
  
  useEffect(() => {
    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered = useMemo(() => {
    let list = [...bookmarks];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) || b.url.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sort === "newest") {
      list.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sort === "oldest") {
      list.sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    } else if (sort === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [bookmarks, search, sort]);

  const deleteBookmark = async (id: string) => {
    const ok = confirm("Delete this bookmark?");
    if (!ok) return;

    const { error } = await supabase.from("bookmarks").delete().eq("id", id);

    if (error) return showToast(error.message, "error");
    showToast("Deleted 🗑️", "success");
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    showToast("Copied link 📋", "success");
  };

  if (loading) {
    return (
      <div className="space-y-3 mt-6">
        <div className="h-20 bg-white/60 border border-black/5 rounded-3xl animate-pulse" />
        <div className="h-20 bg-white/60 border border-black/5 rounded-3xl animate-pulse" />
        <div className="h-20 bg-white/60 border border-black/5 rounded-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <Toast message={toast.msg} type={toast.type} />

      <div className="mt-6">
        <SearchSortBar
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          total={filtered.length}
        />
      </div>

      {/* Empty State */}

      {filtered.length === 0 ? (
        <div className="mt-6 bg-white/70 backdrop-blur border border-black/5 rounded-3xl p-10 shadow-sm text-center">
          <p className="text-2xl font-extrabold mb-2">No bookmarks found 😅</p>
          <p className="text-gray-600">
            Try adding a new bookmark or change your search.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-linear-to-r from-purple-800/70 border border-purple-950/90  rounded-3xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Left */}
                <div className="flex-1">
                  <p className=" text-white text-xl font-extrabold">{b.title}</p>

                  <a
                    href={b.url}
                    target="_blank"
                    className="text-blue-600 underline break-all mt-1 inline-block"
                  >
                    {b.url}
                  </a>

                  <p className="text-xs text-gray-500 mt-3">
                    Added: {new Date(b.created_at).toLocaleString()}
                  </p>
                </div>

                {/* Right Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => copyUrl(b.url)}
                    className="px-4 py-2 rounded-2xl font-bold bg-gray-800 text-white hover:bg-black transition"
                  >
                    Copy
                  </button>

                  <a
                    href={b.url}
                    target="_blank"
                    className="px-4 py-2 rounded-2xl font-bold border border-gray-400 hover:bg-gray-50 transition"
                  >
                    Open
                  </a>

                  <button
                    onClick={() => deleteBookmark(b.id)}
                    className="px-4 py-2 rounded-2xl font-bold bg-red-500 text-white hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

