"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { nav, quoteUrl } from "../lib/navigation";
export function Header() {
 const [open,setOpen]=useState(false); const toggle=useRef<HTMLButtonElement>(null); const path=usePathname();
 return <header className="site-header ea-dark" onKeyDown={e=>{if(e.key==="Escape"&&open){setOpen(false);toggle.current?.focus();}}}><div className="ea-container header-row"><Link href="/" aria-label="EasyEA – etusivu" onClick={()=>setOpen(false)}><Image src="/logo.png" alt="EasyEA" width={150} height={50} priority /></Link><nav className="ea-desktop-nav" aria-label="Päänavigaatio">{nav.map(([label,url])=><Link key={url} href={url} aria-current={path===url?"page":undefined}>{label}</Link>)}</nav><Link href={quoteUrl} className="ea-button ea-button-primary header-cta">Pyydä tarjous ryhmällesi <span aria-hidden="true">↗</span></Link><button ref={toggle} className="ea-menu-toggle" aria-expanded={open} aria-controls="mobile-nav" onClick={()=>setOpen(!open)}>{open?"Sulje":"Valikko"}<span aria-hidden="true">{open?"×":"☰"}</span></button></div><nav id="mobile-nav" className="ea-mobile-nav ea-container" aria-label="Mobiilinavigaatio" hidden={!open}>{nav.map(([label,url])=><Link key={url} href={url} aria-current={path===url?"page":undefined} onClick={()=>setOpen(false)}>{label}<span aria-hidden="true">↗</span></Link>)}<Link href={quoteUrl} className="ea-button ea-button-primary" onClick={()=>setOpen(false)}>Pyydä tarjous ryhmällesi</Link></nav></header>;
}
