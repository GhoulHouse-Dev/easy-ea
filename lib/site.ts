import type { Metadata } from "next";
import pages from "./pages.json";
export { pages };
export const siteUrl = process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
export const indexable = process.env.SITE_INDEXABLE === "true";
export { nav, quoteUrl } from "./navigation";
export function pageMetadata(page: typeof pages[number]): Metadata {
 const path = page.slug ? `/${page.slug}/` : "/";
 return { title: page.seoTitle, description: page.description, alternates: { canonical: path }, openGraph: { title: page.seoTitle, description: page.description, url: path, type: "website", locale: "fi_FI", siteName: "EasyEA", images: [{url:"/og.png",width:1200,height:630,alt:"EasyEA – rohkeutta auttaa"}] } };
}
export const courses = [
 {id:"hataensiapu-4h",name:"Hätäensiapu 4 h®",short:"Hätäensiapu 4 h",duration:"4 tuntia",text:"Tiivis koulutus tärkeimpiin hätäensiaputaitoihin.",link:"Tutustu 4 tunnin kurssiin",goal:"Haluat tiiviin kokonaisuuden."},
 {id:"hataensiapu-8h",name:"Hätäensiapu 8 h®",short:"Hätäensiapu 8 h",duration:"8 tuntia",text:"Yhden päivän kokonaisuus hätäensiaputilanteiden harjoitteluun.",link:"Tutustu 8 tunnin kurssiin",goal:"Haluat yhden päivän koulutuksen."},
 {id:"ea1",name:"EA1®",short:"EA1",duration:"2 päivää",text:"Kaksipäiväinen kurssi, jolla ensiapuun perehdytään laajemmin.",link:"Tutustu EA1-kurssiin",goal:"Haluat perehtyä ensiapuun laajemmin."},
 {id:"ea2",name:"EA2®",short:"EA2",duration:"Jatkokurssi",text:"Jatkokurssi aiemmin EA1-kurssin suorittaneelle.",link:"Tutustu EA2-kurssiin",goal:"Olet suorittanut EA1-kurssin."}
];
