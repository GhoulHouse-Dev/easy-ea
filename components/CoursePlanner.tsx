"use client";
import { useState } from "react";
import Link from "next/link";
import { buyerRoles, trainingCourses, trainingPackages, trainingLink, type TrainingContext, type RoleId, type PackageId, type CourseId } from "../lib/training";
import { parseCount } from "../lib/budget";

export function CoursePlanner({initial={}, guide}:{initial?:TrainingContext, guide?:React.ReactNode}) {
  const [roleId,setRoleId]=useState<RoleId>(initial.roleId??"hr");
  const [packageId,setPackageId]=useState<PackageId>(initial.packageId??trainingPackages.find(p=>p.courseIds.some(id=>id===initial.courseId))?.id??"toimisto");
  const [courseId,setCourseId]=useState<CourseId>(initial.courseId??"hataensiapu-4h");
  const [people,setPeople]=useState(String(initial.participants??12));
  const role=buyerRoles.find(r=>r.id===roleId)!;
  const selectedPackage=trainingPackages.find(p=>p.id===packageId)!;
  const course=trainingCourses.find(c=>c.id===courseId)!;
  const participants=parseCount(people);
  const groupTooSmall=courseId==="raataloity"&&participants!==null&&participants<4;
  const context:TrainingContext={courseId,roleId,packageId,participants:participants??undefined};
  return <section className="ea-container ea-section planner" id="kurssivalinta" aria-labelledby="planner-title">
    <div className="planner-heading"><p className="eyebrow">ROOLISTA SOPIVAAN KOULUTUKSEEN</p><h2 className="ea-h2" id="planner-title">Mitä olet järjestämässä?</h2><p>Valitse roolisi ja koulutuksen lähtökohta. Sisältö, todistus, ryhmäjako ja hinta vahvistetaan tarjouksessa.</p></div>
    <fieldset className="planner-fieldset"><legend><span className="planner-step">01</span> Valitse roolisi</legend><div className="role-grid">{buyerRoles.map(r=><label className={`role-card ${roleId===r.id?"is-selected":""}`} key={r.id}><input type="radio" name="buyer-role" value={r.id} checked={roleId===r.id} onChange={()=>{setRoleId(r.id);if(r.id==="kasvatus"){setPackageId("lapset");setCourseId("raataloity");}}}/><span><strong>{r.name}</strong><span>{r.text}</span></span></label>)}</div></fieldset>
    <div className="role-guide"><strong>{role.name}: näin pääset alkuun</strong><p>{role.guide}</p></div>
    <fieldset className="planner-fieldset"><legend><span className="planner-step">02</span> Valitse koulutuspaketin lähtökohta</legend><div className="package-grid">{trainingPackages.map(p=><label className={`package-card ${packageId===p.id?"is-selected":""}`} key={p.id}><div className="package-card-top"><span className="tag">{p.tag}</span><input type="radio" name="training-package" value={p.id} checked={packageId===p.id} onChange={()=>{setPackageId(p.id);setCourseId(p.courseIds[0]);}}/></div><strong>{p.name}</strong><span className="package-english">{p.english}</span><span className="package-card-copy">{p.text}</span><span className="package-price">Hinta tarjouksella</span></label>)}</div></fieldset>
    <div className="planner-final"><div className="planner-fields"><p className="planner-label"><span className="planner-step">03</span> Täsmennä ryhmäsi tiedot</p><div className="ea-field"><label className="ea-label" htmlFor="planner-course">Kurssi</label><select className="ea-select" id="planner-course" value={courseId} onChange={e=>setCourseId(e.target.value as CourseId)}>{trainingCourses.filter(c=>selectedPackage.courseIds.some(id=>id===c.id)).map(c=><option value={c.id} key={c.id}>{c.name} · {c.duration}</option>)}</select></div><div className="ea-field"><label className="ea-label" htmlFor="planner-people">Osallistujamäärä</label><input className="ea-input" id="planner-people" inputMode="numeric" value={people} onChange={e=>setPeople(e.target.value)} aria-invalid={participants===null||groupTooSmall} aria-describedby="planner-people-help"/><p id="planner-people-help" className={participants===null||groupTooSmall?"ea-error":"ea-help"}>{participants===null?"Syötä kokonaisluku väliltä 1–10 000.":groupTooSmall?"Räätälöidyn koulutuksen vähimmäisryhmä on 4 henkilöä. Voit myös kysyä muusta kurssista.":"Alustava arvio riittää. Ryhmäjako sovitaan kouluttajan kanssa."}</p></div></div>
      <aside className="planner-summary" aria-labelledby="plan-summary-title"><p className="eyebrow">OMA KOULUTUSSUUNNITELMASI</p><h3 className="ea-h3" id="plan-summary-title">{selectedPackage.name}</h3><dl><div><dt>Kurssi</dt><dd>{course.name}</dd></div><div><dt>Laajuus</dt><dd>{course.duration}</dd></div><div><dt>Osallistujat</dt><dd>{participants??"Tarkista määrä"}</dd></div><div><dt>Toteutus</dt><dd>Lähikoulutus</dd></div><div><dt>Hinta</dt><dd>Vahvistetaan tarjouksessa</dd></div></dl>{courseId==="ea2"?<p className="plan-condition">EA2 edellyttää aiempaa EA1-suoritusta. Kerro suoritusajankohdasta tarjouspyynnössä.</p>:null}{participants!==null&&!groupTooSmall?<><Link className="ea-button ea-button-primary" href={trainingLink("/ensiapukoulutus-hinta/",context)}>Jatka hintalaskuriin <span aria-hidden="true">↗</span></Link><Link className="ea-link planner-budget-link" href={trainingLink("/yhteystiedot/",context)}>Pyydä tarjous sähköpostilla</Link></>:<p className="ea-help">Tarkista osallistujamäärä, niin voit jatkaa tarjouspyyntöön.</p>}</aside>
    </div><p className="planner-footnote">Rooli auttaa hankinnan suunnittelussa. Sopiva koulutus määräytyy työpaikan tarpeista ja osallistujien aiemmasta osaamisesta.</p>
    {packageId === "lapset" ? guide : null}
  </section>;
}
