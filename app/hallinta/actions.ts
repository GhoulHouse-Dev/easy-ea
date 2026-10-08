"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminClient, adminConfigured, requireStaff } from "../../lib/supabase/server";
import { emptyParticipant, parseParticipants, today, validateParticipant, validDate, type AdminState, type Participant, type Training } from "../../lib/admin";

const value=(data:FormData,key:string)=>String(data.get(key)||"").trim();
const uuid=(id:string)=>/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(id);
export async function loginAction(_:AdminState,data:FormData):Promise<AdminState> {
  if (!adminConfigured()) return {error:"Pilviyhteys odottaa määritystä. Kirjautuminen on suljettu."};
  const db=await adminClient();
  const {error}=await db.auth.signInWithPassword({email:value(data,"email"),password:String(data.get("password")||"")});
  if (error) return {error:"Kirjautuminen ei onnistunut. Tarkista tunnukset tai yritä hetken kuluttua uudelleen."};
  const {data:{user}}=await db.auth.getUser();
  const {data:member}=user?await db.from("ea_admin_members").select("user_id").eq("user_id",user.id).eq("active",true).maybeSingle():{data:null};
  if (!member) {await db.auth.signOut();return {error:"Tällä tunnuksella ei ole EasyEA:n hallintaoikeutta."};}
  redirect("/hallinta/");
}
export async function logoutAction() { if(adminConfigured()) {const db=await adminClient();await db.auth.signOut();} redirect("/hallinta/kirjaudu/"); }
export async function saveTraining(_:AdminState,data:FormData):Promise<AdminState> {
  const {db}=await requireStaff();
  const fields={company:value(data,"company"),course:value(data,"course"),training_date:value(data,"training_date"),code:value(data,"code"),delivery_agreement:value(data,"delivery_agreement"),admin_minutes:Number(value(data,"admin_minutes")),corrections:Number(value(data,"corrections"))};
  if (!fields.company || !fields.course || !fields.delivery_agreement || !/^[\p{L}\p{N}_-]{2,50}$/u.test(fields.code) || !validDate(fields.training_date)) return {error:"Täytä yritys, kurssi, koulutuspäivä, tunnus ja sovittu toimitustapa. Tunnus: 2–50 kirjainta, numeroa, alaviivaa tai viivaa."};
  if (Object.values(fields).some(s=>typeof s==="string" && s.length>500) || !Number.isInteger(fields.admin_minutes) || fields.admin_minutes<0 || fields.admin_minutes>100000 || !Number.isInteger(fields.corrections) || fields.corrections<0 || fields.corrections>100000) return {error:"Tarkista kenttien pituus, hallinnointiminuutit ja korjausten määrä."};
  const id=value(data,"id");
  if(id) {
    if(!uuid(id)) return {error:"Koulutuksen tunniste on virheellinen."};
    const {data:saved,error}=await db.from("ea_trainings").update(fields).eq("id",id).eq("version",Number(value(data,"version"))).select("id").maybeSingle();
    if(error || !saved) return {error:"Tallennus ei onnistunut. Tunnus voi olla käytössä tai toinen käyttäjä muutti tietoja. Päivitä sivu."};
    revalidatePath("/hallinta","layout");return {success:"Koulutuksen tiedot tallennettu."};
  }
  const {data:saved,error}=await db.from("ea_trainings").insert(fields).select("id").single();
  if(error || !saved) return {error:"Koulutusta ei voitu tallentaa. Tarkista, ettei tunnus ole jo käytössä."};
  revalidatePath("/hallinta");redirect(`/hallinta/koulutukset/${saved.id}/`);
}
export async function saveParticipant(_:AdminState,data:FormData):Promise<AdminState> {
  const {db,staff}=await requireStaff();const trainingId=value(data,"training_id"), id=value(data,"id");
  if(!uuid(trainingId) || (id && !uuid(id))) return {error:"Tunniste on virheellinen."};
  const {data:training}=await db.from("ea_trainings").select("*").eq("id",trainingId).single();
  if(!training || training.archived) return {error:"Koulutus ei ole käytettävissä."};
  const {data:old}=id?await db.from("ea_participants").select("*").eq("id",id).eq("training_id",trainingId).single():{data:null};
  if(id && !old) return {error:"Osallistujaa ei löytynyt."};
  const p:Participant={...emptyParticipant,...old,id:id||"",training_id:trainingId,version:old?.version||0,name:value(data,"name"),email:value(data,"email"),attendance:value(data,"attendance"),result:value(data,"result"),document_ref:value(data,"document_ref"),delivery_method:value(data,"delivery_method"),recipient:value(data,"recipient"),delivered_on:value(data,"delivered_on")};
  if(old?.result==="Hyväksytty" && p.result==="Hyväksytty" && (old.name!==p.name || old.email!==p.email)) return {error:"Nimen tai sähköpostin korjaus edellyttää suorituksen ja dokumentin uutta tarkistamista. Palauta suoritus ensin odottamaan ja käsittele toimitustieto tarvittaessa."};
  if(p.result!=="Hyväksytty") {p.confirmed_by="";p.confirmed_on="";p.document_approved_by="";p.document_approved_on="";}
  else if(old?.result!=="Hyväksytty") {p.confirmed_by=staff.display_name;p.confirmed_on=today();}
  if(data.get("approve_document") === "on") {
    if(!old?.document_approved_by || old.document_ref!==p.document_ref) {p.document_approved_by=staff.display_name;p.document_approved_on=today();}
  } else {p.document_approved_by="";p.document_approved_on="";}
  const error=validateParticipant(training as Training,p);if(error) return {error};
  const {id:omitId,version:omitVersion,...fields}=p;void omitId;void omitVersion;
  const result=id?await db.from("ea_participants").update(fields).eq("id",id).eq("version",Number(value(data,"version"))).select("id").maybeSingle():await db.from("ea_participants").insert(fields).select("id").single();
  if(result.error || !result.data) return {error:"Tallennus ei onnistunut. Tarkista kaksoiskappaleet ja 100 osallistujan raja. Jos toinen käyttäjä muutti tietoja, päivitä sivu."};
  revalidatePath("/hallinta","layout");return {success:"Osallistujan tiedot tallennettu."};
}
export async function importParticipants(_:AdminState,data:FormData):Promise<AdminState> {
  const {db}=await requireStaff();const id=value(data,"training_id");if(!uuid(id)) return {error:"Koulutuksen tunniste on virheellinen."};
  const {data:training}=await db.from("ea_trainings").select("*").eq("id",id).single();
  if(!training || training.archived) return {error:"Koulutus ei ole käytettävissä."};
  const {data:existing,error:readError}=await db.from("ea_participants").select("email").eq("training_id",id);
  if(readError) return {error:"Osallistujalistaa ei voitu tarkistaa."};
  const parsed=parseParticipants(value(data,"csv"),training.code,(existing||[]).map(p=>p.email));
  if(parsed.errors.length) return {error:parsed.errors.slice(0,4).join(" ")};
  const {error}=await db.from("ea_participants").insert(parsed.rows.map(row=>({...emptyParticipant,...row,training_id:id})));
  if(error) return {error:"Tuonti keskeytyi. Yhtään tämän erän riviä ei tallennettu. Päivitä lista ja tarkista kaksoiskappaleet sekä 100 osallistujan raja."};
  revalidatePath("/hallinta","layout");return {success:`${parsed.rows.length} osallistujaa tuotu.`};
}
