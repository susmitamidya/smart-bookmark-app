"use client";

export default function Toast({
  message,
  type = "success",
}: {
  message: string;
  type?: "success" | "error";
}) {
  if (!message) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-lg text-white text-sm font-semibold
      ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {message}
    </div>
  );
}

