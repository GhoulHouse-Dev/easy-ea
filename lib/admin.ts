import Papa from "papaparse";

export const attendanceOptions = ["Odottaa", "Osallistui", "Poissa"] as const;
export const resultOptions = ["Odottaa", "Hyväksytty", "Täydennettävä", "Ei hyväksytty"] as const;
export const deliveryOptions = ["", "Yrityksen yhteyshenkilölle", "Osallistujalle", "Muu sovittu tapa"] as const;
export type Training = {
  id: string; company: string; course: string; training_date: string; code: string;
  delivery_agreement: string; admin_minutes: number; corrections: number; archived: boolean; version: number;
};
export type Participant = {
  id: string; training_id: string; name: string; email: string;
  attendance: string; result: string; confirmed_by: string; confirmed_on: string;
  document_ref: string; document_approved_by: string; document_approved_on: string;
  delivery_method: string; recipient: string; delivered_on: string; archived: boolean; version: number;
};
export type Staff = { user_id: string; display_name: string };
export type AdminState = { error?: string; success?: string };
export const emptyParticipant: Omit<Participant,"id"|"training_id"|"version"> = {
  name:"", email:"", attendance:"Odottaa", result:"Odottaa", confirmed_by:"", confirmed_on:"",
  document_ref:"", document_approved_by:"", document_approved_on:"", delivery_method:"", recipient:"", delivered_on:"", archived:false,
};
export function validEmail(value: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254; }
export function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T12:00:00Z");
  return !isNaN(date.getTime()) && date.toISOString().slice(0,10) === value;
}
export function today() { return new Intl.DateTimeFormat("sv-SE", {timeZone:"Europe/Helsinki"}).format(new Date()); }
export function formatDate(value: string) { return validDate(value) ? value.split("-").reverse().join(".") : "—"; }
export function nextStep(t: Training, p: Participant): string {
  if (!t.company || !t.course || !t.training_date || !t.code || !t.delivery_agreement) return "Täytä koulutuksen tiedot";
  if (!validEmail(p.email)) return "Täydennä sähköposti";
  if (p.attendance !== "Osallistui") return "Tarkista osallistuminen";
  if (p.result !== "Hyväksytty") return "Vahvista suoritus";
  if (!p.confirmed_by || !p.confirmed_on) return "Kirjaa suoritusvahvistus";
  if (!p.document_ref || !p.document_approved_by || !p.document_approved_on) return "Hyväksy dokumentti";
  if (!p.delivery_method || !p.recipient) return "Sovi toimitus";
  return p.delivered_on ? "Toimitettu" : "Toimita dokumentti";
}
export function validateParticipant(t: Training, p: Participant, currentDate = today()): string | null {
  if (!p.name.trim() || p.name.length > 160) return "Täytä osallistujan nimi (enintään 160 merkkiä).";
  if (!validEmail(p.email)) return "Tarkista sähköpostiosoitteen muoto.";
  if (!attendanceOptions.includes(p.attendance as typeof attendanceOptions[number]) || !resultOptions.includes(p.result as typeof resultOptions[number])) return "Valitse osallistuminen ja suoritus listasta.";
  if (!deliveryOptions.includes(p.delivery_method as typeof deliveryOptions[number])) return "Valitse toimitustapa listasta.";
  if (p.result === "Hyväksytty" && (p.attendance !== "Osallistui" || !p.confirmed_by || !validDate(p.confirmed_on))) return "Hyväksytty suoritus edellyttää osallistumista ja vahvistusta.";
  if ((p.document_approved_by || p.document_approved_on) && (!p.document_ref.trim() || !p.document_approved_by || !validDate(p.document_approved_on) || p.result !== "Hyväksytty")) return "Hyväksy dokumentti vasta hyväksytyn suorituksen jälkeen ja kirjaa tiedostoviite.";
  for (const date of [p.confirmed_on,p.document_approved_on,p.delivered_on]) {
    if (date && (!validDate(date) || date > currentDate || date < t.training_date)) return "Vahvistus-, hyväksymis- ja toimituspäivän pitää olla koulutuspäivän ja tämän päivän välillä.";
  }
  if (p.document_approved_on && p.document_approved_on < p.confirmed_on) return "Dokumenttia ei voi hyväksyä ennen suoritusvahvistusta.";
  if (p.delivered_on && (nextStep(t,{...p,delivered_on:""}) !== "Toimita dokumentti" || p.delivered_on < p.document_approved_on)) return "Toimitus edellyttää hyväksyttyä suoritusta, dokumenttia ja sovittua vastaanottajaa.";
  if (p.delivery_method === "Osallistujalle" && p.recipient.toLowerCase() !== p.email.toLowerCase()) return "Osallistujalle toimitettaessa vastaanottajan pitää vastata osallistujan sähköpostia.";
  for (const value of [p.document_ref,p.recipient,p.confirmed_by,p.document_approved_by]) if (value.length > 500) return "Kentän enimmäispituus on 500 merkkiä.";
  return null;
}
export function csvCell(value: string) {
  // Treat spreadsheet formula prefixes as text on export.
  const safe = /^[\s]*[=+\-@\t\r]/.test(value) ? "'"+value : value;
  return '"'+safe.replaceAll('"','""')+'"';
}
export function csvTemplate(code: string) { return "\ufeffKoulutuksen tunnus;Nimi;Sähköposti\r\n"+csvCell(code)+";;\r\n"; }
export function participantCsv(t: Training, rows: Participant[]) {
  const header = ["Koulutuksen tunnus","Nimi","Sähköposti","Osallistuminen","Suoritus","Vahvistaja","Vahvistuspäivä","Dokumentin viite","Dokumentin hyväksyjä","Hyväksymispäivä","Toimitustapa","Vastaanottaja","Toimituspäivä","Seuraava toimi"];
  return "\ufeff"+[header,...rows.filter(p=>!p.archived).map(p=>[t.code,p.name,p.email,p.attendance,p.result,p.confirmed_by,p.confirmed_on,p.document_ref,p.document_approved_by,p.document_approved_on,p.delivery_method,p.recipient,p.delivered_on,nextStep(t,p)])].map(row=>row.map(csvCell).join(";")).join("\r\n");
}
export function parseParticipants(text: string, code: string, existingEmails: string[] = []) {
  const errors: string[] = [];
  const rows: {name:string;email:string}[] = [];
  if (text.length > 200000) return {rows,errors:["Tiedosto on liian suuri. Enimmäiskoko on 200 kt."]};
  const result = Papa.parse<string[]>(text.replace(/^\ufeff/,""), {skipEmptyLines:"greedy", delimiter:";"});
  if (result.errors.length) return {rows,errors:["CSV:n lainausmerkit tai rivirakenne ovat virheellisiä."]};
  const [header,...data] = result.data;
  if (!header || header.length !== 3 || header.map(s=>s.trim()).join(";") !== "Koulutuksen tunnus;Nimi;Sähköposti") return {rows,errors:["Käytä CSV-pohjaa: Koulutuksen tunnus;Nimi;Sähköposti."]};
  const emails = new Set(existingEmails.map(s=>s.toLowerCase()));
  data.forEach((raw,index)=>{
    if (raw.every(s=>!s.trim())) return;
    const [rowCode,name,email] = raw.map(s=>s.trim());
    if (raw.length !== 3) {errors.push(`Rivi ${index+2}: tarvitaan kolme saraketta.`);return;}
    if (rowCode !== code) {errors.push(`Rivi ${index+2}: koulutuksen tunnus ei vastaa valittua koulutusta.`);return;}
    if (!name || name.length > 160 || !validEmail(email)) {errors.push(`Rivi ${index+2}: tarkista nimi ja sähköposti.`);return;}
    if ([rowCode,name,email].some(s=>/^[=+\-@]/.test(s))) {errors.push(`Rivi ${index+2}: kaavalta näyttävää arvoa ei tuoda.`);return;}
    const key=email.toLowerCase();
    if (emails.has(key)) {errors.push(`Rivi ${index+2}: sähköpostiosoite on listalla jo kerran.`);return;}
    emails.add(key); rows.push({name,email});
  });
  if (rows.length + existingEmails.length > 100) errors.push("Yhteen koulutukseen mahtuu enintään 100 osallistujaa.");
  if (!rows.length && !errors.length) errors.push("CSV ei sisällä osallistujia.");
  return {rows,errors};
}
