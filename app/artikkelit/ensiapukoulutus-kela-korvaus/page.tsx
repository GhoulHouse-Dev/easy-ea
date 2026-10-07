import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { article, sectionId } from "../../../lib/article";
import { siteUrl } from "../../../lib/site";
import { FinalCTA } from "../../../components/Shared";

const markdown = readFileSync(path.join(process.cwd(), "content/artikkelit/ensiapukoulutus-kela-korvaus.md"), "utf8").replace(/^# [^\n]+\n+/, "");
const headings = Array.from(markdown.matchAll(/^## (.+)$/gm), match => ({ title: match[1], id: sectionId(match[1]) }));
const firstSection = markdown.indexOf("\n## ");
const intro = markdown.slice(0, firstSection);
const body = markdown.slice(firstSection);

export const metadata: Metadata = {
  title: article.seoTitle,
  description: article.description,
  alternates: { canonical: article.path },
  openGraph: {
    title: article.title, description: article.description, url: article.path,
    type: "article", locale: "fi_FI", siteName: "EasyEA",
    publishedTime: article.datePublished, modifiedTime: article.dateModified,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "EasyEA – rohkeutta auttaa" }],
  },
};

function ArticleProse({ children }: { children: string }) {
  return <div className="article-prose"><ReactMarkdown remarkPlugins={[remarkGfm]} components={{
    h2: ({ children }) => <h2 id={sectionId(String(children))}>{children}</h2>,
    a: ({ href, children }) => href?.startsWith("/") ? <Link href={href}>{children}</Link> : <a href={href}>{children}</a>,
  }}>{children}</ReactMarkdown></div>;
}

export default function KelaArticle() {
  const url = `${siteUrl}${article.path}`;
  const structuredData = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "BlogPosting", "@id": `${url}#artikkeli`, headline: article.title,
        description: article.description, datePublished: article.datePublished, dateModified: article.dateModified,
        inLanguage: "fi-FI", mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Organization", name: "EasyEA", url: siteUrl },
        publisher: { "@type": "Organization", name: "EasyEA", url: siteUrl,
          logo: { "@type": "ImageObject", url: `${siteUrl}/logo.png` } },
        image: `${siteUrl}/og.png` },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Etusivu", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Artikkelit", item: `${siteUrl}/artikkelit/` },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ] },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>
    <article className="article-shell ea-container">
      <nav className="article-breadcrumb" aria-label="Murupolku"><Link href="/">Etusivu</Link><span aria-hidden="true">/</span><Link href="/artikkelit/">Artikkelit</Link><span aria-hidden="true">/</span><span aria-current="page">Kela-korvaus</span></nav>
      <header className="article-header"><p className="eyebrow"><span className="small-cross" aria-hidden="true">+</span> HR:N OPAS · ENSIAPUKOULUTUS</p><h1 className="ea-h1">{article.title}</h1><p className="article-byline">EasyEA <span aria-hidden="true">·</span> <time dateTime={article.datePublished}>7.10.2026</time><br/>Viranomaislähteet tarkistettu 7.10.2026</p></header>
      <div className="article-intro"><ArticleProse>{intro}</ArticleProse></div>
      <nav className="article-toc" aria-label="Artikkelin sisältö"><h2>Tässä oppaassa</h2><ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol></nav>
      <ArticleProse>{body}</ArticleProse>
    </article>
    <FinalCTA title="Suunnitellaan teille sopiva ensiapukoulutus" text="Kerro työpaikan koulutustarve, osallistujamäärä ja paikkakunta. EasyEA auttaa koulutuksen toteutuksen suunnittelussa."/>
  </>;
}
