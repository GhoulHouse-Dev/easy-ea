import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function adminConfigured() { return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY; }
export async function adminClient() {
  if (!adminConfigured()) throw new Error("Pilviyhteyttä ei ole määritetty.");
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookieOptions:{sameSite:"lax",secure:process.env.NODE_ENV==="production",httpOnly:true},
    cookies:{getAll:()=>store.getAll(),setAll(values){try {values.forEach(({name,value,options})=>store.set(name,value,options));} catch {/* Proxy refreshes cookies for Server Components. */}}},
  });
}
export async function requireStaff() {
  if (!adminConfigured()) redirect("/hallinta/kirjaudu/");
  const db=await adminClient();
  const {data:{user},error}=await db.auth.getUser();
  if (error || !user) redirect("/hallinta/kirjaudu/");
  const {data:staff,error:staffError}=await db.from("ea_admin_members").select("user_id,display_name").eq("user_id",user.id).eq("active",true).maybeSingle();
  if (staffError || !staff) redirect("/hallinta/kirjaudu/?tila=ei-oikeutta");
  return {db,staff,user};
}
