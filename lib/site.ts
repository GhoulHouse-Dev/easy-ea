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
export { courses } from "./training";
