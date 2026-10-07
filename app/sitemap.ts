import type { MetadataRoute } from "next";
import { pages, siteUrl, indexable } from "../lib/site";
import { article } from "../lib/article";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable) return [];
  return [...pages.map(p => ({url: `${siteUrl}/${p.slug ? p.slug + "/" : ""}`})),
    {url: `${siteUrl}/artikkelit/`},
    {url: `${siteUrl}${article.path}`, lastModified: article.dateModified}];
}
