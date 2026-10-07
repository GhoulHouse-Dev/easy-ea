import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "../components/Header";
import { Footer } from "../components/Shared";
import { siteUrl, indexable } from "../lib/site";
import "./tokens.css";
import "./globals.css";
const manrope = localFont({ src: "../public/fonts/Manrope.ttf", display: "swap", variable: "--font-manrope", weight: "200 800" });
export const metadata: Metadata = { metadataBase: new URL(siteUrl), title: "EasyEA – ensiapukoulutukset", description: "Käytännönläheistä ensiapukoulutusta Kouvolasta koko Suomeen.", robots: {index:indexable,follow:indexable}, icons:{icon:"/icon.svg"} };
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) {
 return <html lang="fi" className={manrope.variable}><body className="ea-site"><a className="ea-skip-link" href="#sisalto">Siirry sisältöön</a><Header/><main id="sisalto">{children}</main><Footer/></body></html>;
}
