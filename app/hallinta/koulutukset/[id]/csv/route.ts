import { requireStaff } from "../../../../../lib/supabase/server";
import { csvTemplate, participantCsv } from "../../../../../lib/admin";
export async function GET(request:Request,{params}:{params:Promise<{id:string}>}) {
  const {db}=await requireStaff();const {id}=await params;
  const {data:training,error}=await db.from("ea_trainings").select("*").eq("id",id).single();
  if(error||!training) return new Response("Koulutusta ei löytynyt.",{status:404});
  const template=new URL(request.url).searchParams.get("tyyppi")==="pohja";
  let body:string;
  if(template) body=csvTemplate(training.code);
  else {const {data:rows,error}=await db.from("ea_participants").select("*").eq("training_id",id).order("name");if(error) return new Response("Vienti ei onnistunut.",{status:503});body=participantCsv(training,rows||[]);}
  return new Response(body,{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":`attachment; filename="EasyEA_${template?"osallistujalista":"sisainen_rekisteri"}_${id}.csv"`,"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff","X-Robots-Tag":"noindex, nofollow"}});
}
