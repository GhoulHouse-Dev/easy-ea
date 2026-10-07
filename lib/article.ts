export const article = {
  slug: "ensiapukoulutus-kela-korvaus",
  path: "/artikkelit/ensiapukoulutus-kela-korvaus/",
  title: "Ensiapukoulutuksen Kela-korvaus: HR:n opas työnantajalle",
  seoTitle: "Ensiapukoulutuksen Kela-korvaus | HR-opas | EasyEA",
  description: "Milloin työnantaja voi saada Kela-korvausta ensiapukoulutuksesta? Lue korvauksen ehdot, 60 %:n laskenta ja HR:n käytännön muistilista.",
  excerpt: "Selvitä korvauksen ehdot, työnantajan velvollisuudet ja koulutushankinnan vaiheet. Käytännön opas HR:lle ja esihenkilöille.",
  datePublished: "2026-10-07",
  dateModified: "2026-10-07",
};

export function sectionId(title: string) {
  return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
