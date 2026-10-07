import type { MetadataRoute } from "next";
import { pages, siteUrl, indexable } from "../lib/site";
export default function sitemap():MetadataRoute.Sitemap{return indexable?pages.map(p=>({url:`${siteUrl}/${p.slug?p.slug+"/":""}`})):[];}
