"use client";

export type SortType = "newest" | "oldest" | "az";

export default function SearchSortBar({
  search,
  setSearch,
  sort,
  setSort,
  total,
}: {
  search: string;
  setSearch: (v: string) => void;
  sort: SortType;
  setSort: (v: SortType) => void;
  total: number;
}) {
  return (
    <div className="bg-white/80 backdrop-blur border border-black/5 rounded-3xl p-3 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Search */}

        <div className="flex-1">
          <label className="text-xs font-semibold text-gray-700">
            Search bookmarks
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or URL..."
            className="mt-0 w-full border border-gray-400 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        {/* Sort */}
        <div className="w-full md:w-30">
          <label className="text-xs font-semibold text-gray-700">
            Sort by
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortType)}
            className="mt-0 w-full border border-gray-400 p-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="az">A → Z</option>
          </select>
        </div>

        {/* Total */}
        <div className="md:text-right">
          <p className="text-xs font-semibold text-gray-600">Total</p>
          <p className="text-lg font-extrabold">{total}</p>
        </div>
      </div>
    </div>
  );
}
