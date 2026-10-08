import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { PGlite } from "@electric-sql/pglite";

test("Postgres schema enforces staff RLS, manual approvals, atomic import and stale-write protection",async()=>{
 const db=new PGlite();
 const staff="11111111-1111-4111-8111-111111111111", outsider="22222222-2222-4222-8222-222222222222";
 try {
  await db.exec(`create role anon;create role authenticated;create schema auth;create table auth.users(id uuid primary key);create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;grant usage on schema auth to anon,authenticated;insert into auth.users values('${staff}'),('${outsider}');`);
  await db.exec(await readFile(new URL("../supabase/schema.sql",import.meta.url),"utf8"));
  await db.query("insert into public.ea_admin_members(user_id,display_name) values($1,'Testihallinnoija')",[staff]);
  await db.exec("set role anon");await assert.rejects(db.query("select * from public.ea_trainings"),/permission denied/);
  await db.exec("reset role;set role authenticated");await db.query("select set_config('request.jwt.claim.sub',$1,false)",[outsider]);
  assert.equal((await db.query("select * from public.ea_trainings")).rows.length,0);
  await assert.rejects(db.query("insert into public.ea_trainings(company,course,training_date,code,delivery_agreement) values('Testi','Kurssi','2026-10-06','EA-001','Sovittu')"));
  await assert.rejects(db.query("insert into public.ea_admin_members(user_id,display_name) values($1,'Self-granted')",[outsider]),/permission denied/);
  await db.query("select set_config('request.jwt.claim.sub',$1,false)",[staff]);
  const {rows:[t]}=await db.query("insert into public.ea_trainings(company,course,training_date,code,delivery_agreement) values('Testiyritys','Kurssi','2026-10-06','EA-001','Sovittu') returning *");
  const {rows:[p]}=await db.query("insert into public.ea_participants(training_id,name,email) values($1,'Testiosallistuja','test@example.com') returning *",[t.id]);
  await assert.rejects(db.query("update public.ea_participants set attendance='Poissa',result='Hyväksytty' where id=$1",[p.id]),/accepted_requires_attendance/);
  await assert.rejects(db.query("update public.ea_participants set delivered_on='2026-10-08' where id=$1",[p.id]));
  const {rows:[accepted]}=await db.query("update public.ea_participants set attendance='Osallistui',result='Hyväksytty' where id=$1 and version=1 returning *",[p.id]);
  assert.equal(accepted.confirmed_by,"Testihallinnoija");assert.equal(accepted.version,2);
  assert.equal((await db.query("update public.ea_participants set name='Stale overwrite' where id=$1 and version=1 returning id",[p.id])).rows.length,0);
  await assert.rejects(db.query("update public.ea_participants set email='changed@example.com' where id=$1",[p.id]),/Identity correction/);
  await db.query("update public.ea_participants set document_ref='test-ref',document_approved_by='request approval',document_approved_on='2026-10-08',delivery_method='Osallistujalle',recipient=email where id=$1",[p.id]);
  await db.query("update public.ea_participants set delivered_on=document_approved_on where id=$1",[p.id]);
  await assert.rejects(db.query("update public.ea_trainings set training_date='2030-01-01' where id=$1",[t.id]),/conflicts/);
  await assert.rejects(db.query("insert into public.ea_participants(training_id,name,email) values($1,'Duplicate','TEST@example.com')",[t.id]),/unique/);
  await assert.rejects(db.query("insert into public.ea_participants(training_id,name,email) select $1,'Testi '||i,'test'||i||'@example.com' from generate_series(1,100) i",[t.id]),/Participant limit/);
  assert.equal(Number((await db.query("select count(*) from public.ea_participants")).rows[0].count),1,"failed batch inserts no rows");
  await db.exec("reset role");await db.query("update public.ea_admin_members set active=false where user_id=$1",[staff]);await db.exec("set role authenticated");
  assert.equal((await db.query("select * from public.ea_trainings")).rows.length,0,"revoked staff loses access immediately");
 } finally {await db.close();}
});
