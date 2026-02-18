## Getting Started

Smart Bookmark App (Next.js + Supabase + OAuth + Realtime)

A simple fullstack bookmark manager where users can login using Google and manage private bookmarks with realtime updates.

## Live Demo
- Vercel URL: https://smart-bookmark-app-orpin-ten.vercel.app

## GitHub Repo
- Repo Link: 
---
## Features
- Google OAuth login only (no email/password)
- Add bookmark (Title + URL)
- Bookmarks are private per user (Row Level Security enabled)
- Realtime updates across tabs (Supabase Realtime)
- Delete your own bookmarks
- Deployed on Vercel
---
## Tech Stack
- Next.js 14+ (App Router)
- Supabase (Auth + Postgres + Realtime)
- Tailwind CSS
- Vercel
---
## Supabase Setup

### 1) Create Table
Run in Supabase SQL Editor:
```sql
create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  url text not null,
  created_at timestamp with time zone default now()
);
create index bookmarks_user_id_idx on bookmarks(user_id);

2) Enable RLS + Policies
alter table bookmarks enable row level security;
create policy "Users can view their own bookmarks"
on bookmarks for select
using (auth.uid() = user_id);
create policy "Users can insert their own bookmarks"
on bookmarks for insert
with check (auth.uid() = user_id);
create policy "Users can delete their own bookmarks"
on bookmarks for delete
using (auth.uid() = user_id);

3) Enable Realtime
Supabase Dashboard → Database → Replication
Enable realtime for:
bookmarks

#### Google OAuth Setup (Supabase Auth)
Steps:
-Create a project in Google Cloud Console
-Go to APIs & Services → Credentials

Create OAuth Client ID (Web application)

Add redirect URI:

https://<your-project-ref>.supabase.co/auth/v1/callback
Copy Client ID + Secret

Supabase Dashboard → Authentication → Providers → Google
Enable Google and paste credentials.
-----------------------------
####Local Setup
1) Install Dependencies
npm install
2) Create .env.local
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
3) Run Development Server
npm run dev
App runs on:
http://localhost:3000
--------------------------------
### Deployment (Vercel)
Steps:

-Push project to GitHub
-Import repo in Vercel
Add environment variables in Vercel:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
Deploy:

Supabase URL Config (Important)

Supabase → Authentication → URL Configuration

Set:
Site URL:
https://your-vercel-app.vercel.app

Add Redirect URL:

https://your-vercel-app.vercel.app/bookmarks
-----------------------------------------------------
Problems I Faced & How I Solved Them
1) Google OAuth redirect not working

Problem: After login, the user was not redirected correctly.
Solution: Fixed by setting correct Site URL and Redirect URLs in Supabase Auth settings.

2) Insert blocked due to Row Level Security (RLS)

Problem: Bookmarks were not inserting and Supabase returned permission errors.
Solution: Added insert policy:

with check (auth.uid() = user_id)

3) Realtime not updating across tabs

Problem: Bookmarks were not syncing instantly.
Solution: Enabled Realtime replication and used correct filter:

filter: `user_id=eq.${user.id}`

4) Vercel build worked but app failed in production

Problem: Supabase calls failed after deployment.
Solution: Added environment variables properly in Vercel dashboard.
