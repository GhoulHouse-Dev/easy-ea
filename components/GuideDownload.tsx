import Image from "next/image";
import Link from "next/link";
import { childGuide } from "../lib/guide";

export function GuideDownload({ compact = false }: { compact?: boolean }) {
  return <section className={`guide-download ${compact ? "guide-download-compact" : "ea-container ea-section"}`} aria-label="Ilmainen vauvan ja taaperon ensiapuopas">
    <div className="guide-download-card">
      <div className="guide-download-copy">
        <p className="eyebrow">ILMAINEN PDF-OPAS</p>
        <h2 className="ea-h2">Lataa vauvan ja taaperon ensiapuopas jääkaapin oveen</h2>
        <p>Tulostettava muistilista vauvan ja 1–3-vuotiaan lapsen hoitajalle. Pidä tärkeimmät ensiavun perusvaiheet helposti näkyvillä kotona.</p>
        <ul className="guide-facts"><li>2 sivua · tulostettava A4</li><li>Vauvan ja taaperon ohjeet erikseen</li><li>Lähteet ja lisätiedot mukana</li></ul>
        <a className="ea-button ea-button-primary" href={childGuide.pdf} download={childGuide.filename}>Lataa ilmainen PDF-opas <span aria-hidden="true">↓</span></a>
        <p className="guide-download-note">Lataus alkaa suoraan. Sähköpostiosoitetta ei tarvitse antaa.</p>
        <Link className="ea-link" href={childGuide.path}>Katso oppaan sisältö ja lähteet <span aria-hidden="true">↗</span></Link>
      </div>
      <Link href={childGuide.path} className="guide-preview-link" aria-label="Tutustu vauvan ja taaperon ensiapuoppaaseen">
        <Image src={childGuide.preview} alt="Esikatselu PDF-oppaan ensimmäisestä A4-sivusta. Lataa PDF lukeaksesi ohjeet täysikokoisina." width={1061} height={1500} sizes="(max-width: 767px) 260px, 300px" className="guide-preview"/>
        <span>Ensimmäinen sivu jääkaapin oveen</span>
      </Link>
    </div>
  </section>;
}
