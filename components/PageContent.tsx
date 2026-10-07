import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { courses } from "../lib/site";
import { QuoteButton } from "./Shared";
export function Prose({text}:{text:string}) {return <ReactMarkdown remarkPlugins={[remarkGfm]} components={{a:({href,children})=><Link href={href||"#"}>{children}</Link>}}>{text}</ReactMarkdown>;}
export function PageContent({body}:{body:string}) {
 const sections=body.split(/(?=^## )/m).filter(s=>s.trim());
 return <div className="ea-container inner-content">{sections.map((section,i)=>{
 const match=section.match(/^## (.+)\n/); const title=match?.[1];const content=match?section.slice(match[0].length).trim():section;
 const course=courses.find(c=>title?.startsWith(c.name));
 if(title?.startsWith("Kysymyksiä")){const items=content.split(/(?=^### )/m).filter(x=>x.trim());return <section className="content-section faq-section" key={i}><h2 className="ea-h2">{title}</h2><div>{items.map((item,j)=>{const [q,...answer]=item.replace(/^### /,"").split("\n");return <details key={j}><summary>{q}<span aria-hidden="true">+</span></summary><div className="prose"><Prose text={answer.join("\n")}/></div></details>;})}</div></section>;}
 if(title?.startsWith("Vertaile")){const all=[...courses,{name:"Räätälöity koulutus",duration:"2–16 tuntia",goal:"Haluat keskustella oman ryhmän painotuksista.",id:"raataloity"}];return <section className="content-section" key={i}><h2 className="ea-h2">{title}</h2><div className="course-table"><table><caption className="sr-only">Kurssien laajuus ja valinnan lähtökohta</caption><thead><tr><th scope="col">Kurssi</th><th scope="col">Laajuus</th><th scope="col">Valinnan lähtökohta</th></tr></thead><tbody>{all.map(c=><tr key={c.id}><th scope="row"><Link href={`#${c.id}`}>{c.name}</Link></th><td>{c.duration}</td><td>{c.goal}</td></tr>)}</tbody></table></div><div className="mobile-comparison">{all.map(c=><article className="ea-card" key={c.id}><h3><Link href={`#${c.id}`}>{c.name}</Link></h3><dl><dt>Laajuus</dt><dd>{c.duration}</dd><dt>Valinnan lähtökohta</dt><dd>{c.goal}</dd></dl></article>)}</div><p className="comparison-note">Vertailu auttaa keskustelun alkuun. Jos tarvitset tietyn todistuksen tai koulutuksen tiettyyn tarkoitukseen, kerro se yhteydenotossa.</p></section>;}
 return <section className={`content-section ${course?"course-detail":""}`} id={course?.id|| (title?.startsWith("Räätälöity")?"raataloity":undefined)} key={i}>{title&&<div className="section-label">{course&&<span className="tag">{course.duration}</span>}<h2 className="ea-h2">{title}</h2></div>}<div className="prose"><Prose text={content}/>{course&&<QuoteButton course={course.short}/>}</div></section>;
 })}</div>;
}
