import Link from "next/link";
import { adminConfigured } from "../../../lib/supabase/server";
import { LoginForm } from "../../../components/admin/LoginForm";
export default async function LoginPage({searchParams}:{searchParams:Promise<Record<string,string>>}) {
  const configured=adminConfigured(),query=await searchParams;
  return <div className="admin-login-wrap"><div className="admin-login-brand"><span aria-hidden="true">+</span> EasyEA · HALLINTA</div><section className="admin-login-card"><p className="eyebrow">SISÄINEN TYÖTILA</p><h1>Koulutukset hallintaan.</h1><p>Osallistujat, suoritusvahvistukset ja dokumenttien käsittely yhdessä paikassa.</p>{query.tila==="ei-oikeutta"&&<p className="admin-notice admin-error" role="alert">Tunnuksella ei ole hallintaoikeutta. Pyydä käyttöoikeus EasyEA:n vastuuhenkilöltä.</p>}{configured?<LoginForm/>:<div className="admin-setup"><strong>Pilviyhteys odottaa määritystä</strong><p>Kirjautuminen ja osallistujatietojen tallennus ovat suljettuina, kunnes EasyEA:n oma tietokanta ja käyttöoikeudet on kytketty.</p><Link className="ea-button ea-button-primary" href="/hallinta/esikatselu/">Tutustu hallintapaneeliin ↗</Link><p className="admin-help">Esikatselussa käytetään vain kuvitteellisia tietoja.</p></div>}<Link className="admin-back" href="/">← Julkiselle sivustolle</Link></section></div>;
}
