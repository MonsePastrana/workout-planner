-- Run ONLY in the school Workout Planner Supabase project.
-- Creates a new table; does not change existing tables.
begin;

create table public.chat_test_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid()
    references auth.users(id) on delete cascade,
  run_id uuid not null,
  tester_label text not null check (
    tester_label in (
      'Self test', 'External tester 1',
      'External tester 2', 'External tester 3'
    )
  ),
  goal text not null check (
    goal in ('Muscle Gain', 'Strength', 'General Fitness', 'Weight Loss')
  ),
  level text not null check (
    level in ('Beginner', 'Intermediate', 'Advanced')
  ),
  days_per_week smallint not null check (days_per_week between 2 and 5),
  duration_minutes smallint not null check (
    duration_minutes in (30, 45, 60)
  ),
  response_category text not null check (
    response_category in ('initial', 'guidance', 'guardrail', 'fallback')
  ),
  rating text not null check (rating in ('up', 'down')),
  created_at timestamptz not null default now(),
  constraint chat_test_sessions_one_run_per_user unique (user_id, run_id)
);

alter table public.chat_test_sessions enable row level security;

revoke all privileges on table public.chat_test_sessions
  from public, anon, authenticated;
grant select, insert on table public.chat_test_sessions
  to authenticated;

create policy "Read own chat tests"
  on public.chat_test_sessions
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "Insert own chat tests"
  on public.chat_test_sessions
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

commit;
