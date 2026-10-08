import { notFound } from "next/navigation";
import { requireStaff } from "../../../../lib/supabase/server";
import { AdminShell } from "../../../../components/admin/AdminShell";
import { TrainingDetail } from "../../../../components/admin/TrainingDetail";
export default async function DetailPage({params}:{params:Promise<{id:string}>}) {
  const {id}=await params;const {db,staff}=await requireStaff();
  const [{data:training,error},{data:participants,error:participantError}]=await Promise.all([db.from("ea_trainings").select("*").eq("id",id).single(),db.from("ea_participants").select("*").eq("training_id",id).order("name")]);
  if(error||!training) notFound();
  return <AdminShell name={staff.display_name}>{participantError?<p role="alert" className="admin-notice admin-error">Osallistujalistaa ei voitu hakea. Päivitä sivu.</p>:<TrainingDetail training={training} participants={participants||[]}/>}</AdminShell>;
}
