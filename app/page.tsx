import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#28021e] text-white overflow-hidden">
      {/* Background Glow */}
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-50 -left-50 h-125 w-125 rounded-full bg-blue-600/30 blur-[120px]" />
        <div className="absolute -bottom-50 -right-50 h-125 w-125 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute top-50 right-50 h-100 w-100 rounded-full bg-pink-600/20 blur-[120px]" />
      </div>

      {/* Navbar */}

      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/5 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-lg">
            <span className="text-2xl">🔖</span>
            <span>Smart Bookmark</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl font-semibold border border-white/30 hover:bg-white/20 transition"
            >
              Login
            </Link>

            <Link
              href="/bookmarks"
              className="px-4 py-2 rounded-xl font-semibold bg-white text-black hover:bg-gray-200 transition"
            >
              Open App
            </Link>
          </div>
        </div>
      </header>

      {/* Hero part*/}

      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ⚡ Next.js + Supabase + Realtime
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Save bookmarks.
              <br />
              Sync in realtime.
              <br />
              <span className="text-blue-400">Stay organized.</span>
            </h1>

            <p className="text-white/70 mt-6 text-lg leading-relaxed">
              The simplest way to save, sync, and secure your favourite links. Access your library from any device with one-click Google login.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/login"
                className="px-6 py-3 rounded-2xl font-bold  bg-blue-700 border border-white/60 hover:bg-blue-600 transition text-center"
              >
                Continue with Google →
              </Link>

              <Link
                href="/bookmarks"
                className="px-6 py-3 rounded-2xl font-bold bg-linear-to-r from-purple-700  border border-white/60 hover:bg-white/10 transition text-center"
              >
                View My Bookmarks
              </Link>
            </div>

            {/* Mini badges */}
            
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/70">
              <span className="px-3 py-2 bg-white/5 border border-white/30 rounded-xl">
                🔒 Private by default (RLS)
              </span>
              <span className="px-3 py-2 bg-white/5 border border-white/30 rounded-xl">
                ⚡ Realtime sync
              </span>
              <span className="px-3 py-2 bg-white/5 border border-white/30 rounded-xl">
                ☁️ Deployed on Vercel
              </span>
            </div>
          </div>

          {/* Right Premium Card */}

          <div className="bg-linear-to-r to-purple-700/80 border border-white/40 rounded-3xl p-10 shadow-xl" >
            <p className="font-bold text-lg mb-4">📌 Live Preview</p>

            <div className="space-y-3">
              <PreviewCard
                title="LeetCode"
                url="https://leetcode.com"
                note="Synced instantly across tabs ⚡"
              />
              <PreviewCard
                title="GitHub"
                url="https://github.com"
                note="Private to your account 🔒"
              />
              <PreviewCard
                title="Supabase Docs"
                url="https://supabase.com/docs"
                note="Realtime powered by Postgres 🐘"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <MiniStat label="Auth" value="Google OAuth" />
              <MiniStat label="Security" value="RLS Policies" />
              <MiniStat label="Sync" value="Realtime" />
              <MiniStat label="Deploy" value="Vercel" />
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features */}

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center">
          Premium Features ✨
        </h2>
        <p className="text-white/70 text-center mt-3 max-w-2xl mx-auto">
          Built like a real production app with authentication, database security,
          realtime sync, and deployment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <FeatureCard
            title="Google Login"
            desc="One-click login. No new passwords to remember."
            icon="🔑"
          />
          <FeatureCard
            title="Privacy First"
            desc="Each user sees only their own bookmarks. Fully secure."
            icon="🔒"
          />
          <FeatureCard
            title="Magic Sync"
            desc="Save on your laptop, view on your phone instantly. No refresh needed."
            icon="⚡"
          />
          <FeatureCard
            title="Fast UI"
            desc="A clean, snappy interface that works perfectly on mobile and desktop."
            icon="💎"
          />
          <FeatureCard
            title="Always Reliable"
            desc="Your data is saved in a world-class cloud database, so you never lose a link."
            icon="🐘"
          />
          <FeatureCard
            title="Production Deployment"
            desc="Deployed on Vercel with environment variables."
            icon="☁️"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="bg-white/10 border border-white/40 rounded-3xl p-10">
          <h2 className="text-3xl font-extrabold text-center">
            Simple Pricing 💳
          </h2>
          <p className="text-white/70 text-center mt-3">
            This app is free forever. Just login and use it.
          </p>

          <div className="max-w-lg mx-auto mt-10 bg-black/50 border border-white/30 rounded-3xl p-8 shadow-xl">
            <p className="text-sm font-semibold text-blue-400">FREE PLAN</p>
            <h3 className="text-4xl font-extrabold mt-2">₹0</h3>
            <p className="text-white/70 mt-2">
              Perfect for students and creators.
            </p>

            <div className="mt-6 space-y-3 text-white/90">
              <PlanItem text="Unlimited bookmarks" />
              <PlanItem text="Realtime updates across tabs" />
              <PlanItem text="Google login only" />
              <PlanItem text="Private bookmarks (RLS secured)" />
              <PlanItem text="Fast UI + mobile responsive" />
            </div>

            <Link
              href="/login"
              className="block text-center mt-8 px-6 py-3 rounded-2xl font-bold bg-blue-500 hover:bg-blue-700 transition"
            >
              Start Now →
            </Link>
          </div>
        </div>
      </section>


      {/* FAQ */}

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-extrabold text-center">FAQ ❓</h2>
        <p className="text-white/80 text-center mt-3 max-w-2xl mx-auto">
          Some common questions about this project.
        </p>

        <div className=" mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <FaqCard
            q="Are my bookmarks private?"
            a="Absolutely, We use advanced Row Level Security, which means your data is locked to your account and invisible to everyone else."
          />
          <FaqCard
            q="Does realtime work across tabs?"
            a="Yes. If you add a link in one window, it pops up in all your other open tabs automatically."
          />
          <FaqCard
            q="Can I login without Google?"
            a="Currently, we use Google Login to keep things simple and secure so ypu don't have to manage another password."
          />
          <FaqCard
            q="Where is the app deployed?"
            a="The app is deployed on Vercel and connected to Supabase."
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-linear-to-r from-blue-500/80 to-purple-700/80 border border-white/40 rounded-3xl p-10 shadow-xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Start saving your bookmarks today 🚀
          </h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">
            Login with Google and keep everything secure, private, and synced in realtime.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <Link
              href="/login"
              className="px-6 py-3 rounded-2xl font-bold bg-white text-black hover:bg-gray-200 transition"
            >
              Login with Google
            </Link>

            <Link
              href="/bookmarks"
              className="px-6 py-3 rounded-2xl font-bold border border-white/20 hover:bg-white/10 transition"
            >
              Open App
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/30">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center text-white/60 text-sm">
          Built for ❤️ developers, by a developer • Smart Bookmark App
        </div>
      </footer>
    </div>
  );
}

/* ---------------- Small UI Components ---------------- */

function PreviewCard({
  title,
  url,
  note,
}: {
  title: string;
  url: string;
  note: string;
}) {
  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-4 hover:bg-white/5 transition">
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-blue-300 underline break-all">{url}</p>
      <p className="text-xs text-white/60 mt-2">{note}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/30 border border-white/10 rounded-2xl p-4">
      <p className="text-xs text-white/60">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}

function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:bg-white/10 transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-extrabold text-lg">{title}</h3>
      <p className="text-white/70 mt-2">{desc}</p>
    </div>
  );
}

function PlanItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-green-400">✔</span>
      <span>{text}</span>
    </div>
  );
}

function FaqCard({ q, a }: { q: string; a: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition">
      <p className="font-extrabold text-lg">{q}</p>
      <p className="text-white/70 mt-2">{a}</p>
    </div>
  );
}
