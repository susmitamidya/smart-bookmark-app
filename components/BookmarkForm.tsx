"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Toast from "./Toast";

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default function BookmarkForm({ user }: { user: any }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" }>(
    { msg: "", type: "success" }
  );

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 2500);
  };

  const addBookmark = async () => {
    if (!title.trim() || !url.trim()) {
      return showToast("Please fill both Title and URL", "error");
    }

    if (!isValidUrl(url.trim())) {
      return showToast("Please enter a valid URL (https://...)", "error");
    }

    setLoading(true);

    const { error } = await supabase.from("bookmarks").insert([
      {
        title: title.trim(),
        url: url.trim(),
        user_id: user.id,
      },
    ]);

    setLoading(false);

    if (error) return showToast(error.message, "error");

    showToast("Bookmark added 🎉", "success");
    setTitle("");
    setUrl("");
  };

  return (
    <>
      <Toast message={toast.msg} type={toast.type} />

      <div className="bg-white/70 backdrop-blur border border-purple-400/60 rounded-3xl p-6 shadow-sm">
        <h2 className="font-extrabold text-xl">Add Bookmark</h2>
        <p className="text-gray-800 mt-1">
          Save links quickly. They sync instantly across tabs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-6">
          <input
            className="border border-gray-400 p-3 rounded-2xl md:col-span-2 focus:outline-none focus:ring-2 focus:ring-purple-900 bg-white"
            placeholder="Title (Example: GitHub)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border border-gray-400 p-3 rounded-2xl md:col-span-3 focus:outline-none focus:ring-2 focus:ring-purple-900 bg-white"
            placeholder="URL (Example: https://github.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={addBookmark}
            disabled={loading}
            className="md:col-span-5 bg-linear-to-r from-purple-500/90 bg-[#28021e] border border-purple-950/40 hover:bg-blue-600 text-white px-4 py-3 rounded-2xl font-extrabold disabled:opacity-50 transition"
          >
            {loading ? "Adding..." : "Add Bookmark ❤️"}
          </button>
        </div>
      </div>
    </>
  );
}


