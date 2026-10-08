# EasyEA

Suomenkielinen, responsiivinen ensiapukoulutusten verkkosivusto. Next.js App Router, React, TypeScript, itse ylläpidetty CSS ja paikallinen Manrope-fontti.

## Kehitys

Node.js 24 ja npm:

```sh
npm ci
npm run dev
```

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm start
```

Sivut: etusivu, yrityksille, kurssit, hinta, Kouvola, kouluttaja ja yhteystiedot. Sisältö on tiedostossa `lib/pages.json`; etusivun rakenne tiedostossa `app/page.tsx`. Designin muuttujat ovat `app/tokens.css` ja komponenttien tyylit `app/globals.css`. Copy ja käyttöliittymän määrittely löytyvät `docs/`-hakemistosta.

Yritysten oppaat löytyvät osoitteesta `/artikkelit/`. Ensimmäisen artikkelin muokattava teksti on `content/artikkelit/ensiapukoulutus-kela-korvaus.md`, metat ja päivämäärät `lib/article.ts`-tiedostossa. Artikkeli renderöidään staattisesti Markdownista: muuta tekstiä ja julkaise uusi build. Hakutarkoitus ja ylläpito-ohjeet ovat `docs/EasyEA_artikkeli_01_SEO.md`-tiedostossa.

## Vercel

Projekti `easy-ea`, Next.js, projektin juurihakemisto `/`, Node.js 24.x. Maksuton Vercelin tarjoama osoite on projektin `vercel.app`-osoite; omaa domainia ei tarvitse ostaa. Hosting-suunnitelma ja sen käyttöehdot määräytyvät olemassa olevan Vercel-tilin mukaan.

Ensimmäinen julkaisu tehtiin suoraan lähdetiedostoista, koska Vercelin GitHub-yhteydellä ei ollut pääsyä tähän repoon. Automaattiset julkaisut:

1. Varmista Vercelin GitHub App -asetuksista, että `GhoulHouse-Dev/easy-ea` on sallittu repository.
2. Avaa Vercelissä projekti `easy-ea` → Settings → Git ja yhdistä tämä repo.
3. Aseta Production Branch arvoksi `main`. Sen jälkeen main-push julkaisee tuotantoversion ja muut haarat esikatselun.

Älä lisää tokeneita tai ympäristösalaisuuksia repoon. `.vercel/`, `.env*` ja paikalliset build-tiedostot on jätetty versionhallinnan ulkopuolelle.

## Kurssipaketit ja hintalaskuri

`/kurssit/` sisältää roolipohjaisen kurssisuunnittelun ja kolme toimintaympäristön pakettia. `/ensiapukoulutus-hinta/` sisältää käyttäjän antaman 99/79/59 €:n **hinnoitteluesimerkin** sekä omilla tarjoushinnoilla toimivan vertailulaskurin. Hinnat eivät ole vahvistettu myyntihinnasto. Valittu paketti, kurssi ja ryhmäkoko siirtyvät koulutuspyyntöön; laskurin hintatiedot eivät siirry. Toteutus ja laskentatapa: `docs/EasyEA_kurssipaketit_ja_laskuri.md`.

## Tarjouspyyntö

Lomake validoi nimen ja sähköpostin sekä muodostaa käyttäjän tarkistettavan sähköpostiluonnoksen. Käyttäjä avaa luonnoksen sähköpostiohjelmaan tai kopioi viestin ja lähettää sen itse. Lomake ei lähetä tietoja palvelimelle eikä väitä, että viesti olisi lähetetty. Suora sähköposti ja puhelin ovat käytettävissä myös ilman JavaScriptiä. Suora palvelinlähetys edellyttää myöhemmin sähköpostipalvelua ja vastaavaa tietosuojaselosteen päivitystä.

## Hakukoneet ja käyttöönotto

Oletusarvo on `noindex, nofollow`. Esittely ei kilpaile nykyisen easyea.fi-sivuston kanssa. Metat, Open Graph -kuva, kanoniset osoitteet, robots ja sitemap on toteutettu.

Ennen varsinaisen päädomainin käyttöönottoa:

- Vahvista myyjän virallinen nimi ja Y-tunnus: auditissa PRH ja nykyisen sivun alatunniste poikkesivat toisistaan.
- Vahvista kouluttajan pätevyydet, kurssinimien käyttö, todistukset ja ehdot. Hinnastoa, tapahtumia tai palautteita ei ole keksitty.
- Päivitä tietosuojaseloste todelliseen rekisterinpitäjään ja valittuun yhteydenottoprosessiin.
- Aseta Vercelin Production-ympäristössä `SITE_URL=https://www.easyea.fi` (tai vahvistettu päädomain) ja `SITE_INDEXABLE=true`, ja julkaise uudelleen.
- Suunnittele vanhojen osoitteiden uudelleenohjaukset ennen domain-siirtoa. `/kurssit/` ja `/yhteystiedot/` säilyvät.

Sivusto ei sisällä seurantaa, analytiikkaa, someupotuksia tai käyttöliittymän asettamia evästeitä.

## Aineisto

Jamin kuva ja EasyEA-logo ovat käyttäjän osoittamalta nykyiseltä easyea.fi-sivustolta. Manrope on SIL Open Font License -lisenssillä; lisenssi sisältyy `public/fonts/OFL.txt`-tiedostoon. Sivusto käyttää oikeaa nykyistä kuvaa, eikä sisällä luotuja asiakaspalautteita.

## Ilmainen vauvan ja taaperon ensiapuopas

Etusivun ja lasten ensiapupaketin latausosio ohjaa kaksisivuiseen A4-PDF:ään. Esittelysivu: `/oppaat/vauvan-ja-taaperon-ensiapu/`. Lataus toimii ilman henkilötietojen keruuta. Esittelysivun koulutuspyyntö esitäyttää lasten paketin ja oppaan lähdemerkinnän nykyiseen sähköpostiluonnokseen.

Sisältö, lähteet ja tuotanto: [oppaan toteutusmuistio](docs/EasyEA_ilmainen_ensiapuopas.md).
