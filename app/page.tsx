import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-2">Smart Bookmark App</h1>
      <p className="text-gray-600 mb-6 text-center">
        Save your bookmarks privately with Google login .
      </p>

      <Link
        href="/login"
        className="px-6 py-3 bg-black text-white rounded-lg"
      >
        Go to Login
      </Link>
    </div>
  );
}
