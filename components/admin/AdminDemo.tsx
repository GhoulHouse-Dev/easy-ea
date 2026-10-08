"use client";
import { useState } from "react";
import { emptyParticipant, csvTemplate, participantCsv, nextStep, parseParticipants, today, validateParticipant, validDate, type AdminState, type Training, type Participant } from "../../lib/admin";
import { ImportForm, ParticipantList, TrainingForm } from "./AdminForms";
import { Workflow } from "./Workflow";
const exampleTraining:Training={id:"example-1",company:"Esimerkkipäiväkoti",course:"Lasten ensiapu · räätälöity lähikoulutus",training_date:"2026-10-06",code:"DEMO-001",delivery_agreement:"Hyväksytyt dokumentit osallistujille sovitulla sähköpostilla",admin_minutes:25,corrections:1,archived:false,version:1};
const exampleRows:Participant[]=[
  {...emptyParticipant,id:"example-p1",training_id:"example-1",version:1,name:"Esimerkkiosallistuja A",email:"osallistuja.a@example.com",attendance:"Osallistui",result:"Hyväksytty",confirmed_by:"Esimerkkihallinnoija",confirmed_on:"2026-10-06",document_ref:"Sisäinen esimerkkiviite A",document_approved_by:"Esimerkkihallinnoija",document_approved_on:"2026-10-07",delivery_method:"Osallistujalle",recipient:"osallistuja.a@example.com",delivered_on:"2026-10-07"},
  {...emptyParticipant,id:"example-p2",training_id:"example-1",version:1,name:"Esimerkkiosallistuja B",email:"osallistuja.b@example.com",attendance:"Osallistui"},
  {...emptyParticipant,id:"example-p3",training_id:"example-1",version:1,name:"Esimerkkiosallistuja C",email:"osallistuja.c@example.com",attendance:"Poissa"},
];
function download(text:string,filename:string) {const blob=new Blob([text],{type:"text/csv;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export function AdminDemo(){
  const [trainings,setTrainings]=useState<Training[]>([exampleTraining]);const [participants,setParticipants]=useState<Participant[]>(exampleRows);const [selected,setSelected]=useState("example-1");const [newTraining,setNewTraining]=useState(false);
  const t=trainings.find(t=>t.id===selected)!;const rows=participants.filter(p=>p.training_id===t.id);const delivered=rows.filter(p=>nextStep(t,p)==="Toimitettu").length;
  async function trainingAction(_:AdminState,data:FormData):Promise<AdminState>{
    const v=(key:string)=>String(data.get(key)||"").trim();
    const fields={company:v("company"),course:v("course"),training_date:v("training_date"),code:v("code"),delivery_agreement:v("delivery_agreement"),admin_minutes:Number(v("admin_minutes")),corrections:Number(v("corrections"))};
    if(!fields.company||!fields.course||!fields.delivery_agreement||!validDate(fields.training_date)||!/^[\p{L}\p{N}_-]{2,50}$/u.test(fields.code))return {error:"Täytä koulutuksen tiedot ja tarkista tunnus."};
    if(trainings.some(r=>r.code===fields.code&&r.id!==v("id")))return {error:"Koulutuksen tunnus on jo käytössä."};
    const id=v("id");if(id){setTrainings(ts=>ts.map(r=>r.id===id?{...r,...fields,version:r.version+1}:r));return {success:"Esimerkkikoulutuksen tiedot tallennettu näkymään."};}
    const row:Training={...fields,id:crypto.randomUUID(),archived:false,version:1};setTrainings(ts=>[...ts,row]);setSelected(row.id);setNewTraining(false);return {success:"Esimerkkikoulutus luotu."};
  }
  async function participantAction(_:AdminState,data:FormData):Promise<AdminState>{
    const v=(key:string)=>String(data.get(key)||"").trim();const old=rows.find(p=>p.id===v("id"));
    const p:Participant={...emptyParticipant,...old,id:old?.id||crypto.randomUUID(),training_id:t.id,version:(old?.version||0)+1,name:v("name"),email:v("email"),attendance:v("attendance"),result:v("result"),document_ref:v("document_ref"),delivery_method:v("delivery_method"),recipient:v("recipient"),delivered_on:v("delivered_on")};
    if(p.result!=="Hyväksytty"){p.confirmed_by="";p.confirmed_on="";p.document_approved_by="";p.document_approved_on="";}
    else if(old?.result!=="Hyväksytty"){p.confirmed_by="Esimerkkihallinnoija";p.confirmed_on=today();}
    if(data.get("approve_document")==="on"){if(!old?.document_approved_by||old.document_ref!==p.document_ref){p.document_approved_by="Esimerkkihallinnoija";p.document_approved_on=today();}}
    else {p.document_approved_by="";p.document_approved_on="";}
    const error=validateParticipant(t,p);if(error)return {error};
    if(rows.some(r=>r.id!==p.id&&r.email.toLowerCase()===p.email.toLowerCase()))return {error:"Sähköpostiosoite on listalla jo kerran."};
    if(!old&&rows.length>=100)return {error:"Koulutuksessa on jo 100 osallistujaa."};
    setParticipants(ps=>old?ps.map(r=>r.id===p.id?p:r):[...ps,p]);return {success:"Esimerkkiosallistuja tallennettu näkymään."};
  }
  async function importAction(_:AdminState,data:FormData):Promise<AdminState>{const parsed=parseParticipants(String(data.get("csv")||""),t.code,rows.map(p=>p.email));if(parsed.errors.length)return {error:parsed.errors.slice(0,4).join(" ")};setParticipants(ps=>[...ps,...parsed.rows.map(row=>({...emptyParticipant,...row,id:crypto.randomUUID(),training_id:t.id,version:1}))]);return {success:`${parsed.rows.length} esimerkkiosallistujaa tuotu näkymään.`};}
  return <><div className="admin-page-heading"><div><p className="eyebrow">KOULUTUKSET JA OSALLISTUJAT</p><h1>Koulutusten hallinta</h1><p>Yhdestä listasta hyväksyttyihin dokumentteihin.</p></div><button className="ea-button ea-button-primary" onClick={()=>setNewTraining(!newTraining)}>{newTraining?"Sulje uusi koulutus":"+ Uusi koulutus"}</button></div>{newTraining&&<section className="admin-card"><h2>Uusi esimerkkikoulutus</h2><TrainingForm action={trainingAction}/></section>}<div className="admin-training-picker"><label className="ea-label" htmlFor="demo-training">Valitse koulutus</label><select className="ea-select" id="demo-training" value={selected} onChange={e=>setSelected(e.target.value)}>{trainings.map(t=><option key={t.id} value={t.id}>{t.company} · {t.code}</option>)}</select></div><div className="admin-stats"><div><span>Osallistujat</span><strong>{rows.length}</strong></div><div><span>Hyväksytyt suoritukset</span><strong>{rows.filter(p=>p.result==="Hyväksytty").length}</strong></div><div><span>Dokumentti toimitettu</span><strong>{delivered}</strong></div><div><span>Työ odottaa</span><strong>{rows.length-delivered}</strong></div></div><div className="admin-current-training"><div><span className="admin-badge">{t.code}</span><h2>{t.company}</h2><p>{t.course}</p></div><button className="ea-button ea-button-secondary" onClick={()=>download(csvTemplate(t.code),"EasyEA_esimerkki_osallistujalista.csv")}>Lataa CSV-pohja ↓</button></div><section className="admin-card"><ParticipantList key={t.id} training={t} participants={rows} action={participantAction}/><button className="admin-text-button admin-export" onClick={()=>download(participantCsv(t,rows),"EasyEA_esimerkki_sisainen_rekisteri.csv")}>Vie esimerkkirekisteri CSV-tiedostoksi ↓</button></section><ImportForm key={t.id+rows.length} training={t} participants={rows} action={importAction}/><section className="admin-card"><details><summary>Koulutuksen tiedot ja pilotin mittaus</summary><TrainingForm key={t.id+t.version} training={t} action={trainingAction}/></details></section><Workflow code={t.code} company={t.company} course={t.course} date={t.training_date}/></>;
}
