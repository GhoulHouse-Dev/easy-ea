import type { Metadata } from "next";
import { GuideDownload } from "../../components/GuideDownload";
import { ArticleCard } from "../../components/ArticleCard";

export const metadata: Metadata = {
  title: "Ensiapukoulutuksen oppaat yrityksille | EasyEA",
  description: "Ensiapukoulutuksen oppaat HR:lle ja esihenkilöille. Tutustu Kela-korvaukseen, työnantajan velvollisuuksiin ja koulutuksen suunnitteluun.",
  alternates: { canonical: "/artikkelit/" },
};

export default function Articles() {
  return <div className="ea-container article-index">
    <header className="inner-hero"><div><p className="eyebrow">TIETOA HANKINNAN TUEKSI</p><h1 className="ea-h1">Ensiapukoulutuksen oppaat yrityksille</h1><p className="ea-lead">Käytännön tietoa HR:lle ja esihenkilöille. Aloita korvauksen ehdoista ja suunnittele koulutus työpaikkasi tarpeisiin.</p></div></header>
    <ArticleCard/>
    <GuideDownload compact/>
  </div>;
}
