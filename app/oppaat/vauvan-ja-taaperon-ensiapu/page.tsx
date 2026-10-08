import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { childGuide, guideInquiry, guideSources } from "../../../lib/guide";

export const metadata: Metadata = {
  title: "Ilmainen vauvan ja taaperon ensiapuopas PDF | EasyEA",
  description: "Lataa ilmainen vauvan ja taaperon ensiapuopas jääkaapin oveen. Tulostettava A4-muistilista, erilliset ikäryhmien ohjeet ja lähteet. Lataa ilman sähköpostia.",
  alternates: { canonical: childGuide.path },
  openGraph: { title: "Vauvan ja taaperon ensiapuopas – ilmainen PDF", description: "Tulosta ensiavun muistilista jääkaapin oveen. PDF sisältää kaksi sivua ja lähteet.", url: childGuide.path, type: "website", locale: "fi_FI", images: [{ url: "/og.png", width: 1200, height: 630, alt: "EasyEA – rohkeutta auttaa" }] },
};

export default function ChildGuidePage() {
  return <div className="ea-container guide-page">
    <nav className="article-breadcrumb" aria-label="Murupolku"><Link href="/">Etusivu</Link><span aria-hidden="true">/</span><span aria-current="page">Ilmainen ensiapuopas</span></nav>
    <header className="guide-page-hero">
      <div><p className="eyebrow">ILMAINEN · TULOSTETTAVA PDF</p><h1 className="ea-h1 ea-h1-inner">Lataa vauvan ja taaperon ensiapuopas jääkaapin oveen</h1><p className="ea-lead">Pidä ensiavun perusvaiheet helposti näkyvillä. Maksuton opas sisältää A4-muistilistan vauvan ja 1–3-vuotiaan lapsen hoitajalle sekä lähteet ja lisätiedot.</p><a className="ea-button ea-button-primary" href={childGuide.pdf} download={childGuide.filename}>Lataa ilmainen PDF-opas <span aria-hidden="true">↓</span></a><p className="guide-download-note">PDF · 2 sivua · noin 50 kt · ilman sähköpostiosoitetta</p><a className="ea-link" href={childGuide.pdf} target="_blank" rel="noopener noreferrer">Avaa PDF selaimeen <span className="sr-only">(uusi välilehti)</span><span aria-hidden="true">↗</span></a></div>
      <div className="guide-page-preview"><Image src={childGuide.preview} alt="Oppaan ensimmäisen sivun esikatselu: vauvan ja taaperon ensiavun muistilista." width={1061} height={1500} sizes="(max-width: 767px) 280px, 360px" priority/><span>Tulosta sivu 1 jääkaapin oveen</span></div>
    </header>
    <section className="guide-emergency" aria-label="Hätätilanne"><strong>Hätätilanteessa soita 112.</strong><p>Opas tukee taitojen kertaamista. Se ei korvaa ensiapukoulutusta tai hätäkeskuksen ohjeita.</p></section>
    <section className="ea-section guide-details"><div><p className="eyebrow">MITÄ SAAT?</p><h2 className="ea-h2">Yksi sivu näkyville, toinen lisätiedoksi</h2></div><div><h3 className="ea-h3">Sivu 1: ensiavun muistilista</h3><p>Hätäpuhelu, tajuttomuus, elvytys, hengitysteiden vierasesine ja Myrkytystietokeskuksen numero. Vauvan ja taaperon ohjeet on erotettu omiin sarakkeisiin.</p><h3 className="ea-h3">Sivu 2: käyttö ja lähteet</h3><p>Tulostusohje, ikäryhmät ja rajaukset sekä klikattavat lähdelinkit. Voit myös merkitä kodin osoitteen valmiiksi.</p><p><strong>Tulostus:</strong> A4, 100 % / todellinen koko. Tulosta ensimmäinen sivu ja käy se läpi muiden lapsesta huolehtivien kanssa.</p></div></section>
    <section className="guide-sources"><h2 className="ea-h3">Oppaan lähteet ja ajantasaisuus</h2><p>Kooste perustuu Suomen Punaisen Ristin ensiapuohjeisiin ja HUS:n Myrkytystietokeskuksen tietoihin. Lähdesivut tarkistettu {childGuide.checked}. EasyEA:n itsenäinen kooste; ei SPR:n tai HUS:n hyväksymä julkaisu.</p><ul>{guideSources.map(([name, href]) => <li key={href}><a href={href}>{name}</a></li>)}</ul></section>
    <section className="guide-training"><div><p className="eyebrow">HARJOITELKAA YHDESSÄ</p><h2 className="ea-h2">Järjestätkö koulutusta lasten kanssa työskenteleville?</h2><p>Opas auttaa kertaamaan. Käytännön harjoittelu kuuluu koulutukseen. Kerro koulun, päiväkodin tai muun ryhmäsi tarpeesta, niin suunnitellaan sopiva lähikoulutus.</p></div><Link className="ea-button ea-button-primary" href={guideInquiry}>Kysy lasten ensiapukoulutuksesta <span aria-hidden="true">↗</span></Link></section>
  </div>;
}
