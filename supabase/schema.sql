-- EasyEA dedicated project only. Apply once in Supabase SQL Editor or via MCP apply_migration.
-- No participants, secrets or real personal data are included in source control.
begin;
create table public.ea_admin_members (
  user_id uuid primary key references auth.users(id),
  display_name text not null check (length(display_name) between 1 and 160),
  active boolean not null default true
);
alter table public.ea_admin_members enable row level security;
revoke all on public.ea_admin_members from anon, authenticated;
grant select on public.ea_admin_members to authenticated;
create policy member_reads_self on public.ea_admin_members for select to authenticated using (user_id=(select auth.uid()));
create function public.ea_is_staff() returns boolean language sql stable security invoker set search_path='' as $$
  select exists(select 1 from public.ea_admin_members where user_id=(select auth.uid()) and active);
$$;
revoke all on function public.ea_is_staff() from public,anon;
grant execute on function public.ea_is_staff() to authenticated;
create table public.ea_trainings (
  id uuid primary key default gen_random_uuid(),
  company text not null check(length(company) between 1 and 500),
  course text not null check(length(course) between 1 and 500),
  training_date date not null,
  code text not null unique check(length(code) between 2 and 50),
  delivery_agreement text not null check(length(delivery_agreement) between 1 and 500),
  admin_minutes integer not null default 0 check(admin_minutes between 0 and 100000),
  corrections integer not null default 0 check(corrections between 0 and 100000),
  archived boolean not null default false,
  version integer not null default 1,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  created_by uuid not null default auth.uid() references auth.users(id),
  updated_by uuid not null default auth.uid() references auth.users(id)
);
create table public.ea_participants (
  id uuid primary key default gen_random_uuid(), training_id uuid not null references public.ea_trainings(id),
  name text not null check(length(name) between 1 and 160),
  email text not null check(length(email) between 3 and 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  attendance text not null default 'Odottaa' check(attendance in ('Odottaa','Osallistui','Poissa')),
  result text not null default 'Odottaa' check(result in ('Odottaa','Hyväksytty','Täydennettävä','Ei hyväksytty')),
  confirmed_by text not null default '' check(length(confirmed_by)<=500), confirmed_on text not null default '',
  document_ref text not null default '' check(length(document_ref)<=500),
  document_approved_by text not null default '' check(length(document_approved_by)<=500), document_approved_on text not null default '',
  delivery_method text not null default '' check(delivery_method in ('','Yrityksen yhteyshenkilölle','Osallistujalle','Muu sovittu tapa')),
  recipient text not null default '' check(length(recipient)<=500), delivered_on text not null default '',
  archived boolean not null default false, version integer not null default 1,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  created_by uuid not null default auth.uid() references auth.users(id),
  updated_by uuid not null default auth.uid() references auth.users(id),
  constraint accepted_requires_attendance check(result<>'Hyväksytty' or (attendance='Osallistui' and confirmed_by<>'' and confirmed_on<>'')),
  constraint document_requires_approval check((document_approved_by='' and document_approved_on='') or (document_approved_by<>'' and document_approved_on<>'' and document_ref<>'' and result='Hyväksytty')),
  constraint delivery_requires_all_steps check(delivered_on='' or (result='Hyväksytty' and confirmed_by<>'' and confirmed_on<>'' and document_ref<>'' and document_approved_by<>'' and document_approved_on<>'' and delivery_method<>'' and recipient<>'')),
  constraint participant_recipient_matches check(delivery_method<>'Osallistujalle' or lower(recipient)=lower(email))
);
create unique index ea_participants_unique_email on public.ea_participants(training_id,lower(email));
create index ea_trainings_date on public.ea_trainings(training_date desc);
alter table public.ea_trainings enable row level security;
alter table public.ea_participants enable row level security;
revoke all on public.ea_trainings,public.ea_participants from anon,authenticated;
grant select,insert,update on public.ea_trainings,public.ea_participants to authenticated;
create policy staff_read_trainings on public.ea_trainings for select to authenticated using ((select public.ea_is_staff()));
create policy staff_insert_trainings on public.ea_trainings for insert to authenticated with check ((select public.ea_is_staff()));
create policy staff_update_trainings on public.ea_trainings for update to authenticated using ((select public.ea_is_staff())) with check ((select public.ea_is_staff()));
create policy staff_read_participants on public.ea_participants for select to authenticated using ((select public.ea_is_staff()));
create policy staff_insert_participants on public.ea_participants for insert to authenticated with check ((select public.ea_is_staff()));
create policy staff_update_participants on public.ea_participants for update to authenticated using ((select public.ea_is_staff())) with check ((select public.ea_is_staff()));
create function public.ea_record_update() returns trigger language plpgsql security invoker set search_path='' as $$
begin
  new.version:=old.version+1;new.updated_at:=now();new.updated_by:=auth.uid();
  new.created_at:=old.created_at;new.created_by:=old.created_by;
  return new;
end;
$$;
create trigger training_updated before update on public.ea_trainings for each row execute function public.ea_record_update();
create trigger participant_updated before update on public.ea_participants for each row execute function public.ea_record_update();
create function public.ea_training_guard() returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if not public.ea_is_staff() then raise exception 'Staff access required';end if;
  if tg_op='INSERT' then new.created_by:=auth.uid();new.updated_by:=auth.uid();new.version:=1;end if;
  if tg_op='UPDATE' and new.training_date<>old.training_date and exists (
    select 1 from public.ea_participants where training_id=old.id and
      ((confirmed_on<>'' and confirmed_on::date<new.training_date) or
       (document_approved_on<>'' and document_approved_on::date<new.training_date) or
       (delivered_on<>'' and delivered_on::date<new.training_date))
  ) then raise exception 'Training date conflicts with processed participants';end if;
  return new;
end;
$$;
create trigger training_guard before insert or update on public.ea_trainings for each row execute function public.ea_training_guard();
create function public.ea_participant_guard() returns trigger language plpgsql security invoker set search_path='' as $$
declare training_day date;date_value text;staff_name text;
begin
  if not public.ea_is_staff() then raise exception 'Staff access required';end if;
  select display_name into staff_name from public.ea_admin_members where user_id=auth.uid() and active;
  select training_date into training_day from public.ea_trainings where id=new.training_id and not archived;
  if training_day is null then raise exception 'Training unavailable';end if;
  if tg_op='UPDATE' and new.training_id<>old.training_id then raise exception 'Training cannot be reassigned';end if;
  if tg_op='UPDATE' and old.result='Hyväksytty' and new.result='Hyväksytty' and (old.name<>new.name or old.email<>new.email) then raise exception 'Identity correction requires a new approval';end if;
  if tg_op='INSERT' then
    perform pg_advisory_xact_lock(hashtextextended(new.training_id::text,0));
    if (select count(*) from public.ea_participants where training_id=new.training_id)>=100 then raise exception 'Participant limit reached';end if;
    new.created_by:=auth.uid();new.updated_by:=auth.uid();new.version:=1;
  end if;
  if new.result='Hyväksytty' and (tg_op='INSERT' or old.result is distinct from new.result) then
    new.confirmed_by:=staff_name;new.confirmed_on:=(now() at time zone 'Europe/Helsinki')::date::text;
  end if;
  if new.document_approved_by<>'' and (tg_op='INSERT' or old.document_ref is distinct from new.document_ref or old.document_approved_by='') then
    new.document_approved_by:=staff_name;new.document_approved_on:=(now() at time zone 'Europe/Helsinki')::date::text;
  end if;
  foreach date_value in array array[new.confirmed_on,new.document_approved_on,new.delivered_on] loop
    if date_value<>'' and (date_value !~ '^\d{4}-\d{2}-\d{2}$' or date_value::date<training_day or date_value::date>(now() at time zone 'Europe/Helsinki')::date) then raise exception 'Invalid processing date';end if;
  end loop;
  if new.document_approved_on<>'' and new.document_approved_on::date<new.confirmed_on::date then raise exception 'Document approval precedes result';end if;
  if new.delivered_on<>'' and new.delivered_on::date<new.document_approved_on::date then raise exception 'Delivery precedes document approval';end if;
  return new;
end;
$$;
create trigger participant_guard before insert or update on public.ea_participants for each row execute function public.ea_participant_guard();
revoke all on function public.ea_record_update(),public.ea_participant_guard(),public.ea_training_guard() from public,anon,authenticated;
commit;
