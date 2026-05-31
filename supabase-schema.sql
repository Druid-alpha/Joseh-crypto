create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

alter table newsletter_subscribers enable row level security;

create policy "Anyone can subscribe to newsletter"
on newsletter_subscribers
for insert
to anon
with check (true);

create table if not exists contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  project_name text,
  target_service text,
  contact_handle text,
  message text,
  source text,
  created_at timestamptz not null default now()
);

alter table contact_inquiries enable row level security;

create policy "Anyone can submit contact inquiries"
on contact_inquiries
for insert
to anon
with check (true);
