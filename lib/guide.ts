import { trainingLink } from "./training";

export const childGuide = {
  title: "Vauvan ja taaperon ensiapuopas",
  path: "/oppaat/vauvan-ja-taaperon-ensiapu/",
  pdf: "/oppaat/vauvan-ja-taaperon-ensiapuopas.pdf",
  filename: "EasyEA_vauvan_ja_taaperon_ensiapuopas.pdf",
  preview: "/oppaat/vauvan-ja-taaperon-ensiapuopas.webp",
  checked: "8.10.2026",
};

export const guideInquiry = trainingLink("/yhteystiedot/", {
  courseId: "raataloity", roleId: "kasvatus", packageId: "lapset",
}).replace("#tarjouspyynto", "&lahde=ensiapuopas#tarjouspyynto");

export const guideSources = [
  ["SPR: vauvan elvytys", "https://www.punainenristi.fi/ensiapu/ensiapuohjeet/elvytys/vauvan-elvytys/"],
  ["SPR: lapsen elvytys", "https://www.punainenristi.fi/ensiapu/ensiapuohjeet/elvytys/lapsen-elvytys/"],
  ["SPR: vierasesine vauvan hengitysteissä", "https://www.punainenristi.fi/ensiapu/ensiapuohjeet/vierasesineen-poistaminen-hengitysteista-vauva/"],
  ["SPR: vierasesine lapsen hengitysteissä", "https://www.punainenristi.fi/ensiapu/ensiapuohjeet/vierasesineen-poistaminen-hengitysteista-lapsi/"],
  ["SPR: tajuttoman lapsen ensiapu", "https://www.punainenristi.fi/ensiapu/ensiapuohjeet/tajuttoman-ensiapu/tajuttoman-lapsen-ensiapu/"],
  ["SPR: hätäilmoitus", "https://www.punainenristi.fi/ensiapu/ensiapuohjeet/hatailmoituksen-tekeminen/"],
  ["HUS: Myrkytystietokeskus", "https://www.hus.fi/potilaalle/sairaalat-ja-toimipisteet/myrkytystietokeskus"],
] as const;
