# EasyEA — osallistujahallinta

Pohja: käyttäjän `EasyEA_osallistujahallinta_v1.zip`, sen tyhjä Excel-rekisteri, CSV-pohja ja työnkulku. Oikeita osallistujatietoja ei ole siirretty eikä julkaistu.

## Toteutus

- `/hallinta/`: kirjautumista ja erikseen sallittua hallinnoijaa edellyttävä pilvirekisteri.
- `/hallinta/kirjaudu/`: Supabase Auth, sähköposti ja salasana. Ei julkista rekisteröitymistä.
- `/hallinta/esikatselu/`: kuvitteellinen toimiva esikatselu. Tiedot ovat Reactin muistissa; päivitys nollaa ne. Ei localStorage-tallennusta, oikeita tietoja tai pilviyhteyttä.
- Koulutukset: yritys, kurssi, päivä, yksilöllinen tunnus, sovittu toimitus, hallinnointiminuutit ja korjausten määrä.
- Osallistujat: pohjan osallistuminen, suoritus, vahvistaja ja päivä, dokumentin viite, hyväksyjä ja päivä, toimitustapa, vastaanottaja ja todellinen toimituspäivä.
- Koulutuskohtainen CSV-pohja, tarkistettu CSV-tuonti sekä sisäisen rekisterin CSV-vienti. UTF-8 BOM ja puolipiste-erotin. Vienti neutraloi Excel-kaavojen aloitusmerkit.
- CSV: 200 kt, oikea koulutustunnus, nimi ja sähköposti, yksilöllinen sähköposti koulutusta kohden, enintään 100 osallistujaa. Virheellinen erä hylätään kokonaan; tietokanta turvaa myös rinnakkaiset tuonnit.
- Haku, käsittelytilan suodatus, seuraava toimi ja koulutuksen mittarit.
- Vahvistaja ja dokumentin hyväksyjä kirjataan kirjautuneen hallinnoijan nimellä. Ei väitettä Jamin henkilökohtaisesta hyväksynnästä, ellei hän ole vahvistaja. Hallinnoija kirjaa vain kouluttajan vahvistamat suoritukset.
- Ei todistusten generointia, tiedostosisällön tarkistusta, sähköpostilähetystä tai toimituksen automaattista todentamista. Dokumentti toimitetaan käsin sovitussa kanavassa.

## Käyttöönotto — vielä avoin

Uuden Supabase-projektin kustannus-/luontitoiminto ei ollut käytettävissä yhdistetyssä MCP-palvelussa (`get_cost was not returned by tools/list`). Organisaatio `ghoulhouse` on valittu käyttäjän vastauksella. Nykyiset muut Supabase-projektit eivät kuulu EasyEA:lle; niitä ei käytetä tähän.

1. Luo **erillinen** Supabase-projekti `easy-ea-hallinta` organisaatioon `ghoulhouse`, ensisijaisesti EU/Tukholma. Tarkista todellinen suunnitelma, projektiraja ja hinta ennen luontia; maksullista tilausta ei ole valtuutettu.
2. Suorita `supabase/schema.sql` kerran tämän projektin SQL-editorissa tai MCP `apply_migration` -työkalulla. Tämä tiedosto ei ole vielä ajettu pilveen.
3. Poista julkinen käyttäjärekisteröityminen Supabase Auth -asetuksista. Luo vain sovitut hallinnoijat Auth Users -hallinnassa. Salasanoja ei tallenneta lähdekoodiin tai lähetetä tässä keskustelussa.
4. Lisää kunkin sovitun hallinnoijan todellinen Auth UID ja nimi `ea_admin_members`-tauluun projektin ylläpitäjänä. Tässä ei ole automaattista ensimmäisen käyttäjän käyttöoikeutta tai sähköpostiin perustuvaa itseoikeutusta.
5. Aseta Vercel-projektin tuotantoympäristöön `NEXT_PUBLIC_SUPABASE_URL` ja `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (publishable-avain, ei service role -avainta). Julkaise uudelleen. Paikallisessa ympäristössä käytä gitin ohittamaa `.env.local`-tiedostoa.
6. Tarkista kirjautuminen, oikeudeton tunnus, uloskirjautuminen ja pilvitallennus kahden istunnon välillä. Testaa CSV-pohja → tuonti → hyväksyntä → dokumentin viite → toimituksen kirjaus → CSV-vienti.
7. Aja Supabase Security Advisor. Sovi Jamin kanssa palautuskanava, säilytys ja vastuut ennen oikeiden osallistujatietojen keräämistä.

Ilman ympäristömuuttujia hallinta ohjaa suljettuun kirjautumisnäkymään. Tuotantodataa ei oteta selaimen paikalliseen tallennukseen tai palvelimen väliaikaiseen tiedostoon vararatkaisuna.

## Käyttöoikeudet ja tietomalli

Kaikissa kolmessa taulussa on RLS. Anonyymille ei anneta tauluoikeuksia. Kirjautunut käyttäjä näkee vain oman jäsenrivin; koulutus- ja osallistujarivit vaativat aktiivisen `ea_admin_members`-jäsenyyden. Käyttäjä ei voi lisätä itseään jäseneksi tai muuttaa oikeuksiaan Data API:lla. Luetellut hallinnoijat ovat luotettu sisäinen ryhmä ja voivat käsitellä kaikkia EasyEA:n koulutuksia; yritysasiakkaille ei ole erillistä kirjautumista tai pääsyä rekisteriin.

Sivut ja jokainen Server Action tarkistavat käyttäjän Supabasen `getUser()`-kutsulla ja tämänhetkisen aktiivisen jäsenyyden. Tietokannan RLS tekee saman oikeustarkistuksen. Proxy päivittää istunnon, mutta ei ole ainoa suoja. Hallinnan vastaukset ovat `private, no-store` ja `noindex, nofollow`. Evästeet ovat HttpOnly, SameSite=Lax ja tuotannossa Secure.

Tietokantatriggerit valvovat osallistumista, vahvistuksia, päivämääriä, vastaanottajaa, 100 osallistujan rajaa ja koulutuksen vaihtamisen estoa. Päivityksessä versionumero kasvaa; vanha versio ei voi ylikirjoittaa toisen käyttäjän muutosta. `created_by`, `updated_by` ja aikaleimat osoittavat viimeisimmän muutoksen tekijän. Tämä versio ei sisällä täydellistä muuttumatonta tapahtumalokia tai rekisterin poistamisen käyttöliittymää; säilytysajan mukainen poisto tehdään projektin ylläpidossa.

## Tarkistukset

`npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.

Testit kattavat CSV-poikkeamat, käsittelyportit, päivämäärät ja kaavojen neutraloinnin. PGlite-testissä ajetaan varsinainen SQL Postgres-moottorissa testirooleilla: anonyymi ja oikeudeton käyttäjä estetään, itseoikeutus estetään, hyväksyntä vaatii osallistumisen, epäonnistunut CSV-erä peruuntuu kokonaan, vanha versio ei ylikirjoita ja oikeuden poisto katkaisee tietojen käytön.

Paikallinen SQL-testi ei korvaa lopullisen Supabase-projektin Auth/Data API -integraatiotestiä. Se voidaan tehdä vasta pilviprojektin kytkennän jälkeen.
